import express from "express";
import horarioController from "../controllers/horarioController.js";


const horarioRouter = express.Router();

//Rutas para grupo
horarioRouter.get('/horarios', horarioController.obtenerHorarios);
horarioRouter.post('/horarios', horarioController.crearHorario);
horarioRouter.get('/horarios/:idHorario', horarioController.obtenerHorario);
horarioRouter.put('/horarios/:idHorario', horarioController.actualizarHorario);
horarioRouter.delete('/horarios/:idHorario', horarioController.eliminarHorario);


export default horarioRouter;