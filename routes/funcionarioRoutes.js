import express from "express";
import funcionarioController from "../controllers/funcionarioController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const funcionarioRouter = express.Router();

//Rutas de Funcionario
funcionarioRouter.get(
	"/funcionarios",
	checkRole(['Director', 'Secretaria']),
	funcionarioController.getAllFuncionarios,
);
funcionarioRouter.post(
	"/funcionarios",
	checkRole(['Director']),
	funcionarioController.createFuncionario,
);
funcionarioRouter.get(
	"/funcionarios/:id",
	checkRole(['Director','Secretaria']),
	funcionarioController.getFuncionarioById,
);
funcionarioRouter.put(
	"/funcionarios/:id",
	checkRole(['Director']),
	funcionarioController.updateFuncionarioById,
);
funcionarioRouter.delete(
	"/funcionarios/:id",
	checkRole(['Director']),
	funcionarioController.deleteFuncionarioById,
);

export default funcionarioRouter;
