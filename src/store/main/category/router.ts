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
// Controllers
import { 
    createController 
} from "./controllers";

// Router instance
const categoryRouter = Router();

// Get all categories
categoryRouter.get("/", [], (req: any, res: any) => {
  res.json({
    ok: true,
    msg: "get all categories",
  });
});

// Get one category - id
categoryRouter.get("/:id", [], (req: any, res: any) => {
  res.json({
    ok: true,
    msg: "get one category",
  });
});

// Create category
categoryRouter.post(
  "/",
  [
    validateJWT,
    validateJWTId,
    validateJWTRole("ADMIN_ROLE"),
    check("name", "Name is Required").notEmpty(),
    lastValidator,
  ],
  createController.createCategory
);

// Modify category
categoryRouter.put("/:id", [], (req: any, res: any) => {
  res.json({
    ok: true,
    msg: "update category",
  });
});

// Delete category
categoryRouter.delete("/:id", [], (req: any, res: any) => {
  res.json({
    ok: true,
    msg: "delete category",
  });
});

export default categoryRouter;
