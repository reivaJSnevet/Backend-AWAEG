import express from "express";
import rolController from "../controllers/rolController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const rolRouter = express.Router();

//Rutas para Rol
rolRouter.post("/roles", checkRole(["Director"]), rolController.crearRol);
rolRouter.get("/roles", checkRole(["Director"]), rolController.getAllRoles);
rolRouter.get("/roles/:id", checkRole(["Director"]), rolController.getRolById);
rolRouter.put(
	"/roles/:id",
	checkRole(["Director"]),
	rolController.updateRolById,
);
rolRouter.delete(
	"/roles/:id",
	checkRole(["Director"]),
	rolController.deleteRolById,
);

export default rolRouter;
