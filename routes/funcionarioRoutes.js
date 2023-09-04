import express from "express";
import funcionarioController from "../controllers/funcionarioController.js";

const funcionarioRouter = express.Router();

//Rutas de Funcionario
funcionarioRouter.get(
	"/funcionarios",
	funcionarioController.getAllFuncionarios,
);
funcionarioRouter.post(
	"/funcionarios",
	funcionarioController.createFuncionario,
);
funcionarioRouter.get(
	"/funcionarios/:id",
	funcionarioController.getFuncionarioById,
);
funcionarioRouter.put(
	"/funcionarios/:id",
	funcionarioController.updateFuncionarioById,
);
funcionarioRouter.delete(
	"/funcionarios/:id",
	funcionarioController.deleteFuncionarioById,
);

export default funcionarioRouter;
