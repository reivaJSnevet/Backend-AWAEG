import express from "express";
import solicitudController from "../controllers/solicitudController.js";

const solicitudRouter = express.Router();

//Rutas para Solicitud
solicitudRouter.get("/solicitudes", solicitudController.getAllSolicitudes);

export default solicitudRouter;
