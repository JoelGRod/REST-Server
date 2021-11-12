// External Packages
import { Router } from "express";
// Domain Modules Routers
import categoryRouter from "./category/router";

// Router instance
const storeRouter = Router();

storeRouter.use("/category", categoryRouter);

export default storeRouter;