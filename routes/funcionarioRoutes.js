import express from "express";
import funcionarioController from "../controllers/funcionarioController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const funcionarioRouter = express.Router();

//Rutas de Funcionario
funcionarioRouter.get(
	"/funcionarios",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	funcionarioController.getAllFuncionarios,
);
funcionarioRouter.post(
	"/funcionarios",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	funcionarioController.createFuncionario,
);
funcionarioRouter.get(
	"/funcionarios/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	funcionarioController.getFuncionarioById,
);
funcionarioRouter.put(
	"/funcionarios/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	funcionarioController.updateFuncionarioById,
);
funcionarioRouter.delete(
	"/funcionarios/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	funcionarioController.deleteFuncionarioById,
);

export default funcionarioRouter;
