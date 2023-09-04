import express from "express";
import prematriculaController from "../controllers/prematriculaController.js";

const prematriculaRouter = express.Router();

//Rutas para prematriculas
prematriculaRouter.get(
	"/prematriculas",
	prematriculaController.getAllPrematriculas,
);
prematriculaRouter.post(
	"/prematriculas",
	prematriculaController.createPrematricula,
);
// prematriculaRouter.delete('/prematricula', prematriculaController.deletePrematriculaById);

export default prematriculaRouter;
