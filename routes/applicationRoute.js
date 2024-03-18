import { Router } from "express";
import applicationController from "../controllers/applicationController.js";

const applicationRouter = Router();

applicationRouter.get("/applications", applicationController.getAll);
applicationRouter.get("/applications/:applicationId", applicationController.getById);
applicationRouter.get("/applications/type/:type", applicationController.getByType);
applicationRouter.put("/applications/:applicationId", applicationController.update);

export default applicationRouter;