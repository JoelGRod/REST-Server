// External Packages
import { Router } from "express";
// Controllers
import * as responses from "./controllers/responses";
// Router instance
const testRouter = Router();

// Routes
testRouter.get("/", [], responses.getRequest);
testRouter.post("/", [], responses.postRequest);
testRouter.put("/", [], responses.putRequest);
testRouter.delete("/", [], responses.deleteRequest);

export default testRouter;