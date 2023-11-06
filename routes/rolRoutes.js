import express from "express";
import rolController from "../controllers/rolController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const rolRouter = express.Router();

//Rutas para Rol
rolRouter.post("/roles", verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria), rolController.crearRol);
rolRouter.get("/roles", verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria), rolController.getAllRoles);
rolRouter.get("/roles/:id", verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria), rolController.getRolById);
rolRouter.put(
	"/roles/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria),
	rolController.updateRolById,
);
rolRouter.delete(
	"/roles/:id",
	verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria),
	rolController.deleteRolById,
);

export default rolRouter;
