import express from "express";
import claseController from "../controllers/claseController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const claseRouter = express.Router();

claseRouter.get(
	"/clases",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	claseController.getAllClase,
);
claseRouter.post(
	"/clases",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	claseController.crearClase,
);
claseRouter.get(
	"/clases/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	claseController.getClaseById,
);
claseRouter.put(
	"/clases/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),	
    claseController.updateClaseById,
);
claseRouter.delete(
	"/clases/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
    claseController.deleteClaseById,
);
claseRouter.get(
	"/clases/estudiantes/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
    claseController.estudaintesPorClase,
);
claseRouter.get(
    "/clases/funcionarios/:id",
    verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
    claseController.funcionarioMateria,
);

export default claseRouter;
