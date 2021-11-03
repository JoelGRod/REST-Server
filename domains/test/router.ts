// External Packages
import { Router } from "express";
// Controllers
import * as responses from "./controllers/responses";
// Router instance
const testRouter = Router();

// Routes
testRouter.get("/get", [], responses.getRequest);
testRouter.post("/post", [], responses.postRequest);
testRouter.put("/put", [], responses.putRequest);
testRouter.delete("/delete", [], responses.deleteRequest);

export default testRouter;