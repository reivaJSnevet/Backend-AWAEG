import express from 'express';
import checkRole from '../middlewares/roleMiddleware.js';
import { subirArchivo, obtenerArchivo, obtenerArchivos, eliminarArchivo } from '../controllers/archivoController.js';


const archivoRouter = express.Router();

archivoRouter.post('/archivo',checkRole(['Director', 'Maestra']), subirArchivo);
archivoRouter.get('/archivo/:nombreArchivo',checkRole(['Director', 'Maestra', 'Estudiante']), obtenerArchivo);
archivoRouter.get('/archivo', checkRole(['Director', 'Maestra', 'Estudiante']),obtenerArchivos);
archivoRouter.delete('/archivo/:nombreArchivo', checkRole(['Director']),eliminarArchivo);


export default archivoRouter;
