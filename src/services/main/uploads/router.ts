// External Packages
import { Router } from "express";
// Validators
import { 
  checkFileExists
} from "./middlewares";
// Middlewares
import {
  validateJWT,
  validateJWTId,
  validateJWTRole,
} from "../../../shared/main/middlewares";
// Controllers
import { createController } from "./controllers";

// Router instance
const uploadsRouter = Router();

// Get all 

// Get one

// Search 

// Create
uploadsRouter.post(
    "/img",
    [
      validateJWT,
      validateJWTId,
      validateJWTRole("ADMIN_ROLE"),
      checkFileExists
    ], 
    createController.saveImage
);

// Update

// Delete

export default uploadsRouter;