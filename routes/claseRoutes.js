import express from "express";
import claseController from "../controllers/claseController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const claseRouter = express.Router();

claseRouter.get(
	"/clases",
	checkRole(["Director", "Maestra", "Secretaria"]),
	claseController.getAllClase,
);
claseRouter.post(
	"/clases",
	checkRole(["Director"]),
	claseController.crearClase,
);
claseRouter.get(
	"/clases/:id",
	checkRole(["Director", "Maestra", "Secretaria", "Estudiante"]),
	claseController.getClaseById,
);
claseRouter.put(
	"/clases/:id",
	checkRole(["Director", "Secretaria"]),
	claseController.updateClaseById,
);
claseRouter.delete(
	"/clases/:id",
	checkRole(["Director"]),
	claseController.deleteClaseById,
);

export default claseRouter;
