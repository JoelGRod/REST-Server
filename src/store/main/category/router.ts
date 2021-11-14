// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
// Middlewares
import {
  lastValidator,
  validateJWT,
  validateJWTId,
  validateJWTRole,
} from "../../../shared/middlewares";
import { checkCategory } from "./middleware/checkCategory";
// Controllers
import { 
    createController,
    readController,
    updateController,
    deleteController
} from "./controllers";
import { 
  categoryExistsById, 
  categoryNotExistsByName 
} from "./validators/categoryExists";

// Router instance
const categoryRouter = Router();

// Get all categories
categoryRouter.get(
  "/", 
  [
    validateJWT,
    validateJWTId,
    check("limit", "Limit is Required").notEmpty(),
    check("from", "From is Required").notEmpty(),
    lastValidator,
  ], 
  readController.readAllCategories);

// Get one category - id
categoryRouter.get(
  "/:id", 
  [
    validateJWT,
    validateJWTId,
    check("id", "Id must be Provided")
      .notEmpty().isMongoId(),
    lastValidator,
    checkCategory
  ], 
  readController.readOneCategory);

// Create category
categoryRouter.post(
  "/",
  [
    validateJWT,
    validateJWTId,
    validateJWTRole("ADMIN_ROLE"),
    check("name", "Name is Required")
      .notEmpty().custom(categoryNotExistsByName),
    lastValidator,
  ],
  createController.createCategory
);

// Modify category
categoryRouter.put(
  "/:id", 
  [
    validateJWT,
    validateJWTId,
    validateJWTRole("ADMIN_ROLE"),
    check("id", "Id must be Provided")
      .notEmpty().isMongoId().custom(categoryExistsById),
    check("name", "Name is Required")
      .notEmpty().custom(categoryNotExistsByName),
    lastValidator,
  ], 
  updateController.updateCategory
);

// Delete category
categoryRouter.delete(
  "/:id", 
  [
    validateJWT,
    validateJWTId,
    validateJWTRole("ADMIN_ROLE"),
    check("id", "Id must be Provided")
      .notEmpty().isMongoId(),
    lastValidator,
    checkCategory
  ], 
  deleteController.deleteCategory
);

export default categoryRouter;
