import express from "express";
import horarioController from "../controllers/horarioController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const horarioRouter = express.Router();

//Rutas para grupo
horarioRouter.get(
	"/horarios",
	checkRole(["Director", "Maestra", "Secretaria"]),
	horarioController.obtenerHorarios,
);
horarioRouter.post(
	"/horarios",
	checkRole(["Director"]),
	horarioController.crearHorario,
);
horarioRouter.get(
	"/horarios/:id",
	checkRole(["Director", "Maestra", "Secretaria", "Estudiante"]),
	horarioController.obtenerHorario,
);
horarioRouter.put(
	"/horarios/:id",
	checkRole(["Director"]),
	horarioController.actualizarHorario,
);
horarioRouter.delete(
	"/horarios/:id",
	checkRole(["Director"]),
	horarioController.eliminarHorario,
);

export default horarioRouter;
