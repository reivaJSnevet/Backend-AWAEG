import express from "express";
import notaController from "../controllers/notaController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const notaRouter = express();

//Rutas de Nota
notaRouter.get(
	"/notas",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	notaController.obtenerNotas,
);
notaRouter.post(
	"/notas",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	notaController.crearNota,
);
notaRouter.get(
	"/notas/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	notaController.obtenerNotaPorId,
);
notaRouter.put(
	"/notas/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	notaController.actualizarNota,
);
notaRouter.delete(
	"/notas/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	notaController.eliminarNota,
);
notaRouter.get(
	"/notas/clases/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	notaController.obtenerClases,
);

export default notaRouter;
