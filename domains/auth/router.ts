import { Router } from "express";
import { check } from "express-validator";
// Validators
// Middlewares
import { checkUser } from "./middlewares";
import { lastValidator } from "../../infrastructure/middlewares";
// Controllers
import { authController } from "./controllers";
// Router Instance
const router = Router();

/** Routes */
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password id required").notEmpty(),
    lastValidator,
    checkUser
  ],
  authController.login
);

export default router;
