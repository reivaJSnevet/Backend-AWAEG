import express from "express";
import horarioController from "../controllers/horarioController.js";


const horarioRouter = express.Router();

//Rutas para grupo
horarioRouter.get('/horarios', horarioController.getAllHorarios);
horarioRouter.post('/horarios', horarioController.createHorario);


export default horarioRouter;