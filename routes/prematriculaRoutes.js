import express from "express";
import prematriculaController from "../controllers/prematriculaController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const prematriculaRouter = express.Router();

//Rutas para prematriculas
prematriculaRouter.post(
	"/prematriculas",
	checkRole(['Estudiante']),
	prematriculaController.crearPrematricula,
);

prematriculaRouter.get(
	"/prematriculas",
	checkRole(["Director", "Secretaria"]),
	prematriculaController.obtenerPrematriculas,
);

prematriculaRouter.get(
	"/prematriculas/:id",
	checkRole(["Director", "Secretaria"]),
	prematriculaController.obtenerPrematriculaPorId,
);

prematriculaRouter.put(
	"/prematriculas/:id",
	checkRole(["Director", "Secretaria"]),
	prematriculaController.actualizarPrematricula,
);

prematriculaRouter.delete(
	"/prematriculas/:id",
	checkRole(["Director"]),
	prematriculaController.borrarPrematricula,
);

export default prematriculaRouter;
