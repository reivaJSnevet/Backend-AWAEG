import express from "express";
import claseController from "../controllers/claseController.js";

const claseRouter = express.Router();

claseRouter.get("/clases", claseController.getAllClase);
claseRouter.post("/clases", claseController.crearClase);
claseRouter.get("/clases/:id", claseController.getClaseById);
claseRouter.put("/clases/:id", claseController.updateClaseById);
claseRouter.delete("/clases/:id", claseController.deleteClaseById);

export default claseRouter;
