// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Middlewares
import lastValidator from "./middlewares/lastValidator";
import emailExists from "./middlewares/emailExists";
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
      .isEmail(),
    check("password", "Password is required")
      .isLength({ min: 6 }),
    check("role", "Role error")
      .toUpperCase()
      .custom((value) => ["ADMIN", "USER"].includes(value)),
    emailExists,
    lastValidator,
    encryptPassword,
  ],
  create.createUser
);
// testRouter.get("/", [], responses.getRequest);
// testRouter.put("/:id", [], responses.putRequest);
// testRouter.delete("/", [], responses.deleteRequest);

export default userRouter;
