import express from "express";
import estudianteController from "../controllers/estudianteController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const estudianteRouter = express.Router();

//Rutas para Rol
estudianteRouter.post(
	"/estudiantes",
	checkRole(["Director", "Secretaria"]),
	estudianteController.createEstudiante,
);
estudianteRouter.get(
	"/estudiantes",
	checkRole(["Director", "Secretaria", "Maestra"]),
	estudianteController.getAllEstudiantes,
);
estudianteRouter.get(
	"/estudiantes/:id",
	checkRole(["Director", "Secretaria", "Maestra"]),
	estudianteController.getEstudianteById,
);
estudianteRouter.get(
	"/estudiantes/usuario/:id",
	checkRole(["Director", "Secretaria", "Maestra", "Estudiante"]),
	estudianteController.estudianteByUsuarioId,
);
estudianteRouter.put(
	"/estudiantes/:id",
	checkRole(["Director", "Secretaria"]),
	estudianteController.updateEstudianteById,
);
estudianteRouter.delete(
	"/estudiantes/:id",
	checkRole("Director"),
	estudianteController.deleteEstudianteById,
);

export default estudianteRouter;
