import express from "express";
import prematriculaController from "../controllers/prematriculaController.js";

const prematriculaRouter = express.Router();

//Rutas para prematriculas
prematriculaRouter.post(
	"/prematriculas",
	prematriculaController.crearPrematricula,
);

prematriculaRouter.get(
    "/prematriculas",
    prematriculaController.obtenerPrematriculas,
);

prematriculaRouter.get(
    "/prematriculas/:id",
    prematriculaController.obtenerPrematriculaPorId,
);

prematriculaRouter.put(
    "/prematriculas/:id",
    prematriculaController.actualizarPrematricula,
);

prematriculaRouter.delete(
    "/prematriculas/:id",
    prematriculaController.borrarPrematricula,
);

export default prematriculaRouter;
