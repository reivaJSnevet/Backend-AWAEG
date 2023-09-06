import express from "express";
import horarioController from "../controllers/horarioController.js";

const horarioRouter = express.Router();

//Rutas para grupo
horarioRouter.get("/horarios", horarioController.obtenerHorarios);
horarioRouter.post("/horarios", horarioController.crearHorario);
horarioRouter.get("/horarios/:id", horarioController.obtenerHorario);
horarioRouter.put("/horarios/:id", horarioController.actualizarHorario);
horarioRouter.delete("/horarios/:id", horarioController.eliminarHorario);

export default horarioRouter;
