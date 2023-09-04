import express from "express";
import notaController from "../controllers/notaController.js";


const notaRouter = express();

//Rutas de Nota
notaRouter.get('/notas',notaController.obtenerNotas);
notaRouter.post('/notas',notaController.crearNota);
notaRouter.get('/notas/:id',notaController.obtenerNotaPorId);
notaRouter.put('/notas/:id',notaController.actualizarNota);
notaRouter.delete('/notas/:id',notaController.eliminarNota);


export default notaRouter;