// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import emailExists from "./validators/emailExists";
import checkRole from "./validators/checkRole";
// Middlewares
import lastValidator from "./middlewares/lastValidator";
import encryptPassword from "./middlewares/encryptPassword";
// Controllers
import * as create from "./controllers/createUser";
// Router instance
const userRouter = Router();

// Routes
userRouter.post(
  "/create-user", [
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
// testRouter.get("/", [], responses.getRequest);
// testRouter.put("/:id", [], responses.putRequest);
// testRouter.delete("/", [], responses.deleteRequest);

export default userRouter;
