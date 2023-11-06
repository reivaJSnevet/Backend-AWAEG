import express from "express";
import grupoController from "../controllers/grupoController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const grupoRouter = express.Router();

//Rutas para grupo
grupoRouter.get("/grupos", verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria), grupoController.obtenerGrupos);
grupoRouter.post("/grupos", verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria), grupoController.crearGrupo);
grupoRouter.get(
	"/grupos/:seccion",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),
	grupoController.obtenerGrupo,
);
grupoRouter.put(
	"/grupos/:seccion",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria),
	grupoController.actualizarGrupo,
);
grupoRouter.delete(
	"/grupos/:seccion",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria),
	grupoController.eliminarGrupo,
);

grupoRouter.get("/grupos/funcionario/:funcionarioId", verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria), grupoController.obtenerGruposConClasesPorFuncionario);

export default grupoRouter;
