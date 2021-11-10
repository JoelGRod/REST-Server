// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import {
  emailExists,
  checkId,
  checkRole,
  checkPwd
} from "./validators";
// Middlewares
import {
  lastValidator,
  validateJWT
} from "../../infrastructure/middlewares";
import {
  encryptPassword,
  switchIds,
  checkTokenId,
  checkTokenRole
} from "./middlewares";
// Controllers
import {
  createController,
  readController,
  updateController,
  deleteController
} from "./controllers";

// Router instance
const userRouter = Router();

/** Routes */

/** ------------ Create ------------ */
// Create New User (1)vx
userRouter.post(
  "/create",
  [
    check("name", "Name is required").notEmpty().trim(),
    check("email", "Email is required").isEmail().custom(emailExists),
    check("password", "Password is required").isLength({ min: 6 }),
    lastValidator,
    encryptPassword,
  ],
  createController.createUser
);

/** ------------ Read ------------ */
// Get all active users (0)vvx
userRouter.get(
  "/",
  [
    validateJWT,
    check("limit", "Limit is required and must contain something").notEmpty(),
    check("from", "From is required and must contain something").notEmpty(),
    lastValidator,
  ],
  readController.getUsers
);

/** ------------ Update ------------ */
// Update User Info (4)vvx
userRouter.put(
  "/update/info",
  [
    validateJWT,
    check("uid", "Not a valid ID").isMongoId().custom(checkId),
    check("name", "Name is required").notEmpty().trim().optional(),
    check("img", "The image cannot be empty").notEmpty().trim().optional(),
    check("email", "Email is required")
      .isEmail()
      .custom(emailExists)
      .optional(),
    check("role", "Invalid Role")
      .toUpperCase()
      .custom(checkRole.checkDbRole)
      .custom(checkRole.checkAdminRole)
      .optional(),
    lastValidator,
  ],
  updateController.updateInfo
);

// Update User Info By Admin (5)vvx
userRouter.put(
  "/update/info-admin",
  [
    validateJWT,
    check("uid", "Not a valid ID")
      .isMongoId()
      .custom(checkId)
      .custom(checkRole.checkAdminRole),
    check("userUpdatedId", "Not a valid ID").isMongoId().custom(checkId),
    check("name", "Name is required").notEmpty().trim().optional(),
    check("img", "The image cannot be empty").notEmpty().trim().optional(),
    check("email", "Email is required")
      .isEmail()
      .custom(emailExists)
      .optional(),
    check("role", "Invalid Role")
      .toUpperCase()
      .custom(checkRole.checkDbRole)
      .optional(),
    lastValidator,
    switchIds,
  ],
  updateController.updateInfo
);

// Update User Password (2)vvv
userRouter.put(
  "/update/pwd",
  [
    validateJWT,
    checkTokenId,
    checkTokenRole("ADMIN_ROLE", "USER_ROLE"),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    check("oldPwd").custom(checkPwd.checkDbPwd),
    lastValidator,
    encryptPassword,
  ],
  updateController.updatePassword
);

/**
 * Update Password By Admin (3)vvv
 * Security Break: This endpoint can only be accessed via
 * admin user in administration panel
 */
userRouter.put(
  "/update/pwd-admin",
  [
    validateJWT,
    checkTokenId,
    checkTokenRole("ADMIN_ROLE"),
    check("userUpdatedId", "Not a valid ID").isMongoId().custom(checkId),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    lastValidator,
    encryptPassword,
    switchIds,
  ],
  updateController.updatePassword
);

/**
 * Update Forgotten Password (1)vvv
 * Security Break: This endpoint can only be accessed via
 * user email link and custom token in separated frontend
 */
userRouter.put(
  "/update/forgotten-pwd",
  [
    validateJWT,
    check("uid", "Not a valid ID").isMongoId().custom(checkId),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    lastValidator,
    encryptPassword,
  ],
  updateController.updatePassword
);

/** ------------ Delete ------------ */
// Delete User -> Status: false (1)vvv
userRouter.delete(
  "/delete/:deleteId",
  [
    validateJWT,
    checkTokenId,
    checkTokenRole("ADMIN_ROLE"),
    check("deleteId", "Not a valid ID").isMongoId().custom(checkId),
    lastValidator,
  ],
  deleteController.deleteUser
);

export default userRouter;
