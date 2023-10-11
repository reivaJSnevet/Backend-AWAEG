import express from "express";
import citaController from "../controllers/citaController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const claseRouter = express.Router();

claseRouter.post("/citas", checkRole(["Maestra", "Director", "Secretaria"]), citaController.crearCita);
claseRouter.get("/citas", checkRole(["Maestra", "Director", "Secretaria"]),citaController.obtenerCitas);
claseRouter.get("/citas/:id", checkRole(["Maestra", "Director", "Secretaria", "Estudiante"]),citaController.obtenerCitaPorId);
claseRouter.put("/citas/:id", checkRole(["Maestra", "Director", "Secretaria", "Estudiante"]),citaController.actualizarCita);
claseRouter.delete("/citas/:id", checkRole(["Maestra", "Director", "Secretaria"]),citaController.borrarCita);


export default claseRouter;
