// External Packages
import { Router } from "express";
// Domain Modules Routers
import moduleRouter from "./module/application/router";
// Router instance
const testRouter = Router();

// Routes
testRouter.use("/", [], moduleRouter);

export default testRouter;