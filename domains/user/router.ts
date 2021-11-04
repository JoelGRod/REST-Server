// External Packages
import { Router } from "express";
// Controllers
import * as create from "./controllers/createUser";
// Router instance
const userRouter = Router();

// Routes
userRouter.post("/create-user", [], create.createUser);
// testRouter.get("/", [], responses.getRequest);
// testRouter.put("/:id", [], responses.putRequest);
// testRouter.delete("/", [], responses.deleteRequest);

export default userRouter;