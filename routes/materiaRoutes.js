import express from "express";
import materiaController from "../controllers/materiaController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const materiaRouter = express();

//Rutas de Nota
materiaRouter.get(
	"/materias",
	checkRole(["Director"]),
	materiaController.obtenerMaterias,
);
materiaRouter.post(
	"/materias",
	checkRole(["Director"]),
	materiaController.crearMateria,
);
materiaRouter.get(
	"/materias/:id",
	checkRole(["Director"]),
	materiaController.obtenerMateriaPorId,
);
materiaRouter.put(
	"/materias/:id",
	checkRole(["Director"]),
	materiaController.actualizarMateria,
);
materiaRouter.delete(
	"/materias/:id",
	checkRole(["Director"]),
	materiaController.eliminarMateria,
);

export default materiaRouter;
