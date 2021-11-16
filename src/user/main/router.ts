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
  validateJWT,
  validateJWTId,
  validateJWTRole
} from "../../shared/middlewares";
import {
  encryptPassword,
  switchIds
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
// Create New User (1)
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
// Get all active users (0)
userRouter.get(
  "/",
  [
    validateJWT,
    check("uid", "Not a valid ID").isMongoId().custom(checkId),
    check("limit", "Limit is required and must contain something").notEmpty(),
    check("from", "From is required and must contain something").notEmpty(),
    lastValidator,
  ],
  readController.getUsers
);

// Search Users
userRouter.get(
  "/search/:searchTerm",
  [
    check("searchTerm", "The search term must be valid")
      .isString(),
    lastValidator,
  ], 
  readController.searchUser);

/** ------------ Update ------------ */
// Update User Info (4)
userRouter.put(
  "/update/info",
  [
    validateJWT,
    validateJWTId,
    validateJWTRole("ADMIN_ROLE", "USER_ROLE"),
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

// Update User Info By Admin (5)
userRouter.put(
  "/update/info-admin",
  [
    validateJWT,
    validateJWTId,
    validateJWTRole("ADMIN_ROLE"),
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

// Update User Password (2)
userRouter.put(
  "/update/pwd",
  [
    validateJWT,
    validateJWTId,
    validateJWTRole("ADMIN_ROLE", "USER_ROLE"),
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
    validateJWTId,
    validateJWTRole("ADMIN_ROLE"),
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
    validateJWTId,
    validateJWTRole("ADMIN_ROLE"),
    check("deleteId", "Not a valid ID").isMongoId().custom(checkId),
    lastValidator,
  ],
  deleteController.deleteUser
);

export default userRouter;
