// External Packages
import { Router } from "express";
// Domain Modules Routers
import uploadsRouter from "./uploads/router";
// import productRouter from "./product/router";
// Global Middlewares
import { 
    validateJWT, 
    validateJWTId 
} from "../../shared/middlewares";

// Router instance
const servicesRouter = Router();

servicesRouter.use("/uploads", uploadsRouter);
// storeRouter.use("/product", [ validateJWT, validateJWTId ], productRouter);

export default servicesRouter;