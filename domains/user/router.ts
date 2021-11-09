// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import emailExists from "./validators/emailExists";
import checkId from "./validators/checkId";
import * as checkRole from "./validators/checkRole";
import * as checkPwd from "./validators/checkPwd";
// Middlewares
import lastValidator from "../../infrastructure/middlewares/lastValidator";
import encryptPassword from "./middlewares/encryptPassword";
// Controllers
import * as createController from "./controllers/createUser";
import * as readController from "./controllers/readUser";
import * as updateController from "./controllers/updateUser";
import * as deleteController from "./controllers/deleteUser";
// Router instance
const userRouter = Router();

/** Routes */ 

/** ------------ Create ------------ */
// Create New User (1)
userRouter.post(
  "/create",
  [
    check("name", "Name is required")
      .notEmpty().trim(),
    check("email", "Email is required")
      .isEmail().custom(emailExists),
    check("password", "Password is required")
      .isLength({ min: 6 }),
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
    // Token?
    check("limit", "Limit is required and must contain something")
      .notEmpty(),
    check("from", "From is required and must contain something")
      .notEmpty(),
    lastValidator,
  ], 
  readController.getUsers
);

/** ------------ Update ------------ */
// Update User Info (4)
userRouter.put(
  "/update/info",
  [
    // validateJsonWebToken // Validate JWT and set id in body (JWT in HEADERS)
    check("id", "Not a valid ID")
      .isMongoId().custom(checkId),
    check("name", "Name is required")
      .notEmpty().trim().optional(),
    check("img", "The image cannot be empty")
      .notEmpty().trim().optional(),
    check("email", "Email is required")
      .isEmail().custom(emailExists).optional(),
    check("role", "Invalid Role")
      .toUpperCase()
      .custom(checkRole.checkDbRole)
      .custom(checkRole.checkAdminRole).optional(),
    lastValidator,
  ],
  updateController.updateInfo
);

// Update User Info By Admin (5)
userRouter.put(
  "/update/info-admin",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId()
      .custom(checkId)
      .custom(checkRole.checkAdminRole),
    check("userUpdatedId", "Not a valid ID")
      .isMongoId().custom(checkId),
    check("name", "Name is required")
      .notEmpty().trim().optional(),
    check("img", "The image cannot be empty")
      .notEmpty().trim().optional(),
    check("email", "Email is required")
      .isEmail().custom(emailExists).optional(),
    check("role", "Invalid Role")
      .toUpperCase()
      .custom(checkRole.checkDbRole).optional(),
    lastValidator,
    // TODO: Change the body id to the user id
  ],
  updateController.updateInfo
);

// Update User Password (2)
userRouter.put(
  "/update/pwd",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(checkId),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    check("oldPwd")
      .custom(checkPwd.checkDbPwd),
    lastValidator,
    encryptPassword,
  ],
  updateController.updatePassword
);

/**
 * Update Password By Admin (3)
 * Security Break: This endpoint can only be accessed via
 * admin user in administration panel
*/
userRouter.put(
  "/update/pwd-admin",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId()
      .custom(checkId)
      .custom(checkRole.checkAdminRole),
    check("userUpdatedId", "Not a valid ID")
      .isMongoId().custom(checkId),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    lastValidator,
    encryptPassword,
    // TODO: Change the body id to the user id
  ],
  updateController.updatePassword
);

/**
 * Update Forgotten Password (1)
 * Security Break: This endpoint can only be accessed via
 * user email link and custom token in separated frontend
*/
userRouter.put(
  "/update/forgotten-pwd",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(checkId),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    lastValidator,
    encryptPassword,
  ],
  updateController.updatePassword
);

/** ------------ Delete ------------ */
// Delete User -> Status: false (1)
userRouter.delete(
  "/delete", 
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(checkId),
    lastValidator,
  ], 
  deleteController.deleteUser
);

export default userRouter;
