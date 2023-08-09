import express from "express";
import estudianteController from "../controllers/estudianteController.js";


const estudianteRouter = express.Router();

//Rutas para Rol
estudianteRouter.get('/estudiantes', estudianteController.getAllEstudiantes);
estudianteRouter.post('/estudiantes', estudianteController.createEstudiante);


export default estudianteRouter;