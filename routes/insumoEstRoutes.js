import express from 'express';
import insumoEstController from '../controllers/insumoEstController.js';
import checkRole from '../middlewares/roleMiddleware.js';

const insumoEstRouter = express.Router();

//Rutas de Insumo Estudiante
insumoEstRouter.get(
    '/insumoEst', checkRole(['Director', 'Secretaria']),
    insumoEstController.obtenerInsumoEst,
);
insumoEstRouter.post(
    '/insumoEst', checkRole(['Director', 'Secretaria']),
    insumoEstController.crearInsumoEst,
);
insumoEstRouter.get(
    '/insumoEst/:id', checkRole(['Director', 'Secretaria', 'Maestra', 'Estudiante']),
    insumoEstController.obtenerInsumoEstPorId,
);
insumoEstRouter.put(
    '/insumoEst/:id', checkRole(['Director', 'Secretaria']),
    insumoEstController.actualizarInsumoEstPorId,
);
insumoEstRouter.delete(
    '/insumoEst/:id', checkRole(['Director']),
    insumoEstController.borrarInsumoEstPorId,
);

export default insumoEstRouter;