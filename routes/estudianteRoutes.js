import express from "express";
import estudianteController from "../controllers/estudianteController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const estudianteRouter = express.Router();

//Rutas para Rol
estudianteRouter.post(
	"/estudiantes",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	estudianteController.createEstudiante,
);
estudianteRouter.get(
	"/estudiantes",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	estudianteController.getAllEstudiantes,
);
estudianteRouter.get(
	"/estudiantes/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	estudianteController.getEstudianteById,
);
estudianteRouter.get(
	"/estudiantes/usuario/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	estudianteController.estudianteByUsuarioId,
);
estudianteRouter.put(
	"/estudiantes/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	estudianteController.updateEstudianteById,
);
estudianteRouter.delete(
	"/estudiantes/:id",
	verifyRole(ROLES_LIST.Director),
	estudianteController.deleteEstudianteById,
);

estudianteRouter.get(
    "/estudiantes/horario/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
    estudianteController.estudianteHorario,
);

export default estudianteRouter;
