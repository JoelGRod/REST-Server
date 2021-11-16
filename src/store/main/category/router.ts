// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import { 
  categoryExistsById, 
  categoryNotExistsByName 
} from "../shared/validators";
// Middlewares
import {
  lastValidator,
  validateJWTRole,
} from "../../../shared/middlewares";
import { 
  checkCategoryId 
} from "./middlewares";
// Controllers
import { 
    createController,
    readController,
    updateController,
    deleteController
} from "./controllers";

// Router instance
const categoryRouter = Router();

// Get all categories
categoryRouter.get(
  "/", 
  [
    check("limit", "Limit is Required").notEmpty(),
    check("from", "From is Required").notEmpty(),
    lastValidator,
  ], 
  readController.readAllCategories);

// Get one category - id
categoryRouter.get(
  "/:id", 
  [
    check("id", "Id must be Provided")
      .notEmpty().isMongoId(),
    lastValidator,
    checkCategoryId
  ], 
  readController.readOneCategory);

// Search category
categoryRouter.get(
  "/search/:searchTerm", 
  [
    check("searchTerm", "The search term must be valid")
      .isString(),
    lastValidator
  ], 
  readController.searchCategory);

// Create category
categoryRouter.post(
  "/",
  [
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
    validateJWTRole("ADMIN_ROLE"),
    check("id", "Id must be Provided")
      .notEmpty().isMongoId(),
    lastValidator,
    checkCategoryId
  ], 
  deleteController.deleteCategory
);

export default categoryRouter;
