import express from "express";
import citaController from "../controllers/citaController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const claseRouter = express.Router();

claseRouter.post("/citas", verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante), citaController.crearCita);
claseRouter.get("/citas", verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante), citaController.obtenerCitas);
claseRouter.get("/citas/:id", verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),citaController.obtenerCitaPorId);
claseRouter.put("/citas/:id", verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),citaController.actualizarCita);
claseRouter.delete("/citas/:id", verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),citaController.borrarCita);
claseRouter.get("/citasLibres", verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),citaController.citasLibres);


export default claseRouter;
