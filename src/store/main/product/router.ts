// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import { 
  categoryExistsById,
  productNotExistsByName,
  productExistsById
} from "../shared/validators";
// Middlewares
import {
  lastValidator,
  validateJWTRole,
} from "../../../shared/middlewares";
import { 
  checkProductId 
} from "./middlewares";
// Controllers
import { 
    createController,
    readController,
    updateController,
    deleteController
} from "./controllers";

// Router instance
const productRouter = Router();

// Get all products
productRouter.get(
  "/", 
  [
    check("limit", "Limit is Required").notEmpty(),
    check("from", "From is Required").notEmpty(),
    lastValidator,
  ], 
  readController.readAllProducts);

// Get one product - id
productRouter.get(
  "/:id", 
  [
    check("id", "Id must be Provided")
      .notEmpty().isMongoId(),
    lastValidator,
    checkProductId
  ], 
  readController.readOneProduct);

// Create product
productRouter.post(
  "/",
  [
    validateJWTRole("ADMIN_ROLE"),
    check("name", "Name is Required")
      .notEmpty().custom(productNotExistsByName),
    check("price", "Price must be a number")
      .notEmpty().isNumeric().optional(),
    check("description", "Description must be a String")
      .notEmpty().isString().optional(),
    check("available", "Available must be a boolean")
      .notEmpty().isBoolean().optional(),
    check("category", "Category is Required")
      .notEmpty().isMongoId().custom(categoryExistsById),
    lastValidator,
  ],
  createController.createProduct
);

// Modify product
productRouter.put(
  "/:id", 
  [
    validateJWTRole("ADMIN_ROLE"),
    check("id", "Id must be Provided")
      .notEmpty().isMongoId().custom(productExistsById),
    check("name", "Name cannot be empty")
      .notEmpty().custom(productNotExistsByName).optional(),
    check("price", "Price must be a number")
      .notEmpty().isNumeric().optional(),
    check("description", "Description must be a String")
      .notEmpty().isString().optional(),
    check("available", "Available must be a boolean")
      .notEmpty().isBoolean().optional(),
    check("category", "Category cannot be empty")
      .notEmpty().isMongoId().custom(categoryExistsById).optional(),
    lastValidator,
  ], 
  updateController.updateProduct
);

// Delete product
productRouter.delete(
  "/:id", 
  [
    validateJWTRole("ADMIN_ROLE"),
    check("id", "Id must be Provided")
      .notEmpty().isMongoId(),
    lastValidator,
    checkProductId
  ], 
  deleteController.deleteProduct
);

export default productRouter;
