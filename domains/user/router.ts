// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import emailExists from "./validators/emailExists";
import checkRole from "./validators/checkRole";
import idExists from "./validators/idExists";
import * as checkPwd from "./validators/checkPwd"
// Middlewares
import lastValidator from "./middlewares/lastValidator";
import encryptPassword from "./middlewares/encryptPassword";
// Controllers
import * as create from "./controllers/createUser";
import * as update from "./controllers/updateUser";
// Router instance
const userRouter = Router();

// Routes
// Create
userRouter.post(
  "/create",
  [
    check("name", "Name is required")
      .notEmpty().trim(),
    check("email", "Email is required")
      .isEmail().custom(emailExists),
    check("password", "Password is required")
      .isLength({ min: 6 }),
    check("role", "Invalid Role")
      .toUpperCase().custom(checkRole),
    lastValidator,
    encryptPassword,
  ],
  create.createUser
);
// Read
// userRouter.get("/", [], responses.getRequest);
// Update
userRouter.put(
  "/update/info/:id",
  [
    check("id", "Not a valid ID")
      .isMongoId().custom(idExists),
    check("name", "Name is required")
      .notEmpty().trim().optional(),
    lastValidator
  ],
  update.updateInfo
);

userRouter.put(
  "/update/pwd",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(idExists),
    check("password", "Password is required") // Validate secure password
      .isLength({ min: 6 })
      .custom( checkPwd.equalPasswords ),
    check("oldPwd").custom( checkPwd.checkDbPwd ),
    lastValidator,
    encryptPassword,
  ],
  update.updatePassword
);
// Delete
// userRouter.delete("/", [], responses.deleteRequest);

export default userRouter;
