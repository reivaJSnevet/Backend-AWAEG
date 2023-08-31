import express from "express";
import estudianteController from "../controllers/estudianteController.js";


const estudianteRouter = express.Router();

//Rutas para Rol
estudianteRouter.post('/estudiantes', estudianteController.createEstudiante);
estudianteRouter.get('/estudiantes', estudianteController.getAllEstudiantes);
estudianteRouter.get('/estudiantes/:id', estudianteController.getEstudianteById);
estudianteRouter.put('/estudiantes/:id', estudianteController.updateEstudianteById);
estudianteRouter.delete('/estudiantes/:id', estudianteController.deleteEstudianteById);

export default estudianteRouter;