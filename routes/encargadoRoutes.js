import express from "express";
import encargadoController from "../controllers/encargadoController.js";

const encargadoRouter = express.Router();

//Rutas de Encargado
encargadoRouter.get('/encargados', encargadoController.obtenerEncargados);
encargadoRouter.post('/encargados', encargadoController.crearEncargado);
encargadoRouter.get('/encargados/:id', encargadoController.obtenerEncargado);
encargadoRouter.put('/encargados/:id', encargadoController.actualizarEncargado);
encargadoRouter.delete('/encargados/:id', encargadoController.eliminarEncargado);

export default encargadoRouter;