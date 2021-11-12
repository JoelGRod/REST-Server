import { Router } from "express";
import { check } from "express-validator";
// Validators
// Middlewares
import { checkUser, checkGoogleToken, checkGoogleUser } from "./middlewares";
import { lastValidator } from "../../shared/middlewares";
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

router.post(
  "/google",
  [
    check("google-token", "Google Token is required").notEmpty(),
    lastValidator,
    checkGoogleToken, 
    checkGoogleUser
  ],
  authController.login
);

export default router;
