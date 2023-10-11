import express from "express";
import notaController from "../controllers/notaController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const notaRouter = express();

//Rutas de Nota
notaRouter.get(
	"/notas",
	checkRole(["Director", "Maestra", "Secretaria", "Estudiante"]),
	notaController.obtenerNotas,
);
notaRouter.post(
	"/notas",
	checkRole(["Director", "Maestra"]),
	notaController.crearNota,
);
notaRouter.get(
	"/notas/:id",
	checkRole(["Director", "Maestra", "Estudiante", "Secretaria"]),
	notaController.obtenerNotaPorId,
);
notaRouter.put(
	"/notas/:id",
	checkRole(["Director", "Maestra"]),
	notaController.actualizarNota,
);
notaRouter.delete(
	"/notas/:id",
	checkRole(["Director"]),
	notaController.eliminarNota,
);

export default notaRouter;
