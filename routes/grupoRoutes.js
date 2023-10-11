import express from "express";
import grupoController from "../controllers/grupoController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const grupoRouter = express.Router();

//Rutas para grupo
grupoRouter.get("/grupos", checkRole(['Director', 'Maestra', 'Secretaria']), grupoController.obtenerGrupos);
grupoRouter.post("/grupos", checkRole(['Director']), grupoController.crearGrupo);
grupoRouter.get(
	"/grupos/:seccion",
	checkRole(['Director', 'Maestra', 'Secretaria', 'Estudiante']),
	grupoController.obtenerGrupo,
);
grupoRouter.put(
	"/grupos/:seccion",
	checkRole(['Director']),
	grupoController.actualizarGrupo,
);
grupoRouter.delete(
	"/grupos/:seccion",
	checkRole(['Director']),
	grupoController.eliminarGrupo,
);

export default grupoRouter;
