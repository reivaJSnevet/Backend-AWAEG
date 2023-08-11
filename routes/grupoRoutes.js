import express from "express";
import grupoController from "../controllers/grupoController.js";


const grupoRouter = express.Router();

//Rutas para grupo
grupoRouter.get('/grupos', grupoController.getAllGrupos);
grupoRouter.post('/grupos', grupoController.createGrupo);


export default grupoRouter;