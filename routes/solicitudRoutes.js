import express from "express";
import solicitudController from "../controllers/solicitudController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const solicitudRouter = express.Router();

//Rutas para Solicitud
solicitudRouter.get(
	"/solicitudes",
	checkRole(["Director"]),
	solicitudController.getAllSolicitudes,
);

export default solicitudRouter;
