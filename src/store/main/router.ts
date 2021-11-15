// External Packages
import { Router } from "express";
// Domain Modules Routers
import categoryRouter from "./category/router";
import productRouter from "./product/router";
// Global Middlewares
import { 
    validateJWT, 
    validateJWTId 
} from "../../shared/middlewares";

// Router instance
const storeRouter = Router();

storeRouter.use("/category", [ validateJWT, validateJWTId ], categoryRouter);
storeRouter.use("/product", [ validateJWT, validateJWTId ], productRouter);

export default storeRouter;