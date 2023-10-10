import express from 'express';
import { subirArchivo, obtenerArchivo, obtenerArchivos, eliminarArchivo } from '../controllers/archivoController.js';

const archivoRouter = express.Router();

archivoRouter.post('/archivo', subirArchivo);
archivoRouter.get('/archivo/:nombreArchivo', obtenerArchivo);
archivoRouter.get('/archivo', obtenerArchivos);
archivoRouter.delete('/archivo/:nombreArchivo', eliminarArchivo);


export default archivoRouter;
