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
    console.log("hello categories");
    res.json({
        ok: true,
        msg: "You Rocks!!"
    })
});

// // Get one category - id
// categoryRouter.get("/:id", [], controller);

// // Create category
// categoryRouter.post("/", [], controller);

// // Modify category
// categoryRouter.put("/:id", [], controller);

// // Delete category
// categoryRouter.delete("/:id", [], controller);

export default categoryRouter;