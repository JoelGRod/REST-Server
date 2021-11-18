// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import { 
  checkFileExists
} from "./middlewares";
// Middlewares
import {
  lastValidator,
  validateJWTRole,
} from "../../../shared/middlewares";
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
      checkFileExists
    ], 
    createController.saveImage
);

// Update

// Delete

export default uploadsRouter;