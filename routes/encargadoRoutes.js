import express from "express";
import encargadoController from "../controllers/encargadoController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const encargadoRouter = express.Router();

//Rutas de Encargado
encargadoRouter.get(
	"/encargados",
	checkRole(['Director','Secretaria', 'Maestra']),
	encargadoController.obtenerEncargados,
);
encargadoRouter.post(
	"/encargados",
	checkRole(['Director', 'Secretaria']),
	encargadoController.crearEncargado,
);
encargadoRouter.get(
	"/encargados/:id",
	checkRole(['Director','Secretaria','Maestra','Estudiante']),
	encargadoController.obtenerEncargado,
);
encargadoRouter.put(
	"/encargados/:id",
	checkRole(['Director', 'Secretaria']),
	encargadoController.actualizarEncargado,
);
encargadoRouter.delete(
	"/encargados/:id",
	checkRole(['Director']),
	encargadoController.eliminarEncargado,
);

export default encargadoRouter;
