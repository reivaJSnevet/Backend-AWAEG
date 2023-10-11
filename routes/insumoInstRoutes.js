import express from 'express';
import insumoInstController from '../controllers/insumoInstController.js';
import checkRole from '../middlewares/roleMiddleware.js';

const insumoInstRouter = express.Router();

//Rutas de Insumo Institucional
insumoInstRouter.get(
    '/insumoInst', checkRole(['Director', 'Secretaria']),
    insumoInstController.obtenerInsumoInst,
);
insumoInstRouter.post(
    '/insumoInst', checkRole(['Director', 'Secretaria']),
    insumoInstController.crearInsumoInst,
);
insumoInstRouter.get(
    '/insumoInst/:id', checkRole(['Director', 'Secretaria', 'Maestra']),
    insumoInstController.obtenerInsumoInstPorId,
);
insumoInstRouter.put(
    '/insumoInst/:id', checkRole(['Director', 'Secretaria']),
    insumoInstController.actualizarInsumoInstPorId,
);
insumoInstRouter.delete(
    '/insumoInst/:id', checkRole(['Director']),
    insumoInstController.borrarInsumoInstPorId,
);

export default insumoInstRouter;
