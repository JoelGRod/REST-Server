// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
import { 
  categoryExistsById, 
  categoryNotExistsByName,
  productNotExistsByName 
} from "../shared/validators";
// Middlewares
import {
  lastValidator,
  validateJWT,
  validateJWTId,
  validateJWTRole,
} from "../../../shared/middlewares";
// import { checkCategory } from "../shared/middlewares/checkCategory";
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
// productRouter.get(
//   "/", 
//   [
//     validateJWT,
//     validateJWTId,
//     check("limit", "Limit is Required").notEmpty(),
//     check("from", "From is Required").notEmpty(),
//     lastValidator,
//   ], 
//   readController.readAllCategories);
productRouter.get(
  "/", ( req: any, res: any ) => {
    res.json({
      body: req.body
    })
  });

// Get one product - id
// productRouter.get(
//   "/:id", 
//   [
//     validateJWT,
//     validateJWTId,
//     check("id", "Id must be Provided")
//       .notEmpty().isMongoId(),
//     lastValidator,
//     checkCategory
//   ], 
//   readController.readOneCategory);

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
// productRouter.put(
//   "/:id", 
//   [
//     validateJWT,
//     validateJWTId,
//     validateJWTRole("ADMIN_ROLE"),
//     check("id", "Id must be Provided")
//       .notEmpty().isMongoId().custom(categoryExistsById),
//     check("name", "Name is Required")
//       .notEmpty().custom(categoryNotExistsByName),
//     lastValidator,
//   ], 
//   updateController.updateCategory
// );

// Delete product
// productRouter.delete(
//   "/:id", 
//   [
//     validateJWT,
//     validateJWTId,
//     validateJWTRole("ADMIN_ROLE"),
//     check("id", "Id must be Provided")
//       .notEmpty().isMongoId(),
//     lastValidator,
//     checkCategory
//   ], 
//   deleteController.deleteCategory
// );

export default productRouter;
