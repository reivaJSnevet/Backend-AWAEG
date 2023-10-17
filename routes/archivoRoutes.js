import express from 'express';
import { subirArchivo, obtenerArchivo, obtenerArchivos, eliminarArchivo } from '../controllers/archivoController.js';
import verifyRole from '../middlewares/verifyRole.js';
import ROLES_LIST from '../config/roles_list.js';


const archivoRouter = express.Router();

archivoRouter.post('/archivo',verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante), subirArchivo);
archivoRouter.get('/archivo/:nombreArchivo',verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante), obtenerArchivo);
archivoRouter.get('/archivo', verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),obtenerArchivos);
archivoRouter.delete('/archivo/:nombreArchivo', verifyRole(ROLES_LIST.Director, ROLES_LIST.Estudiante),eliminarArchivo);


export default archivoRouter;
