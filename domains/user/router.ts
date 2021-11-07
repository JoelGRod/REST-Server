// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import emailExists from "./validators/emailExists";
import idExists from "./validators/idExists";
import * as checkRole from "./validators/checkRole";
import * as checkPwd from "./validators/checkPwd";
// Middlewares
import lastValidator from "./middlewares/lastValidator";
import encryptPassword from "./middlewares/encryptPassword";
// Controllers
import * as create from "./controllers/createUser";
import * as read from "./controllers/readUser";
import * as update from "./controllers/updateUser";
// Router instance
const userRouter = Router();

/** Routes */ 

/** ------------ Create ------------ */
// Create New User
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
      .toUpperCase().custom(checkRole.checkDbRole),
    lastValidator,
    encryptPassword,
  ],
  create.createUser
);

/** ------------ Read ------------ */
userRouter.get(
  "/", 
  [
    check("limit", "Limit is required and must contain something")
      .notEmpty(),
    check("from", "From is required and must contain something")
      .notEmpty(),
    lastValidator,
  ], 
  read.getUsers
);

/** ------------ Update ------------ */
// Update User Info
userRouter.put(
  "/update/info",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(idExists),
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
  update.updateInfo
);

// Update User Info By Admin
userRouter.put(
  "/update/info-admin",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(idExists)
      .custom(checkRole.checkAdminRole),
    check("userUpdatedId", "Not a valid ID")
      .isMongoId().custom(idExists),
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
  update.updateInfo
);

// Update User Password
userRouter.put(
  "/update/pwd",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(idExists),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    check("oldPwd")
      .custom(checkPwd.checkDbPwd),
    lastValidator,
    encryptPassword,
  ],
  update.updatePassword
);

/**
 * Update Password By Admin
 * Security Break: This endpoint can only be accessed via
 * admin user in administration panel
*/
userRouter.put(
  "/update/pwd-admin",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(idExists)
      .custom(checkRole.checkAdminRole),
    check("userUpdatedId", "Not a valid ID")
      .isMongoId().custom(idExists),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    lastValidator,
    encryptPassword,
    // TODO: Change the body id to the user id
  ],
  update.updatePassword
);

/**
 * Update Forgotten Password
 * Security Break: This endpoint can only be accessed via
 * user email link and custom token in separated frontend
*/
userRouter.put(
  "/update/forgotten-pwd",
  [
    // validateJsonWebToken // Validate JWT and set id in body
    check("id", "Not a valid ID")
      .isMongoId().custom(idExists),
    check("password", "Password is required")
      .isLength({ min: 6 })
      .custom(checkPwd.equalPasswords),
    lastValidator,
    encryptPassword,
  ],
  update.updatePassword
);

/** ------------ Delete ------------ */
// userRouter.delete("/", [], responses.deleteRequest);

export default userRouter;
