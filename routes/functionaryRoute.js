import { Router } from "express";
import functionaryController from "../controllers/functionaryController.js";

const functionaryRouter = Router();

functionaryRouter.post("/functionaries", functionaryController.postFunctionary);
functionaryRouter.get("/functionaries", functionaryController.getAllFunctionaries);
functionaryRouter.get("/functionaries/:id", functionaryController.getFunctionaryById);
functionaryRouter.put("/functionaries/:id", functionaryController.putFunctionary);
functionaryRouter.delete("/functionaries/:id", functionaryController.deleteFunctionary);
functionaryRouter.post("/functionaries/:id/subjects", functionaryController.addSubject);
functionaryRouter.delete("/functionaries/:id/subjects", functionaryController.deleteSubject);

export default functionaryRouter;