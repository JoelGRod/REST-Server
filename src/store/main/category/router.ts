// External Packages
import { Router } from "express";
import { check } from "express-validator";
// Validators
// Middlewares
// Controllers

// Router instance
const categoryRouter = Router();

// Get all categories
categoryRouter.get("/", [], (req: any, res: any) => {
    res.json({
        ok: true,
        msg: "get all categories"
    })
});

// Get one category - id
categoryRouter.get("/:id", [], (req: any, res: any) => {
    res.json({
        ok: true,
        msg: "get one category"
    })
});

// Create category
categoryRouter.post("/", [], (req: any, res: any) => {
    res.json({
        ok: true,
        msg: "create category"
    })
});

// Modify category
categoryRouter.put("/:id", [], (req: any, res: any) => {
    res.json({
        ok: true,
        msg: "update category"
    })
});

// Delete category
categoryRouter.delete("/:id", [], (req: any, res: any) => {
    res.json({
        ok: true,
        msg: "delete category"
    })
});

export default categoryRouter;