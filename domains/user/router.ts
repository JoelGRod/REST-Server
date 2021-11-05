// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Middlewares
import lastValidator from "./middlewares/lastValidator";
import emailExists from "./middlewares/emailExists";
import encryptPassword from "./middlewares/encryptPassword";
import checkRole from "./middlewares/checkRole";
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
    check("role", "Role error")
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
