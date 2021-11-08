import { Router } from "express";
import { check } from "express-validator";
// Validators
// Middlewares
import lastValidator from "../../infrastructure/middlewares/lastValidator";
// Controllers
import * as authController from "./controllers/auth";
// Router Instance
const router = Router();

/** Routes */
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password id required").notEmpty(),
    lastValidator
  ],
  authController.login
);

export default router;
