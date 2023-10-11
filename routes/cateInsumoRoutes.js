import express from 'express';
import cateInsumoController from '../controllers/cateInsumoController.js';
import checkRole from '../middlewares/roleMiddleware.js';

const cateInsumoRouter = express.Router();

//Rutas de Categorias de Insumos
cateInsumoRouter.get(
    '/cateInsumo', checkRole(['Director', 'Secretaria']),
    cateInsumoController.obtenerCateInsumo,
);
cateInsumoRouter.post(
    '/cateInsumo', checkRole(['Director', 'Secretaria']),
    cateInsumoController.crearCateInsumo,
);
cateInsumoRouter.get(
    '/cateInsumo/:id', checkRole(['Director', 'Secretaria', 'Maestra', 'Estudiante']),
    cateInsumoController.obtenerCateInsumoPorId,
);
cateInsumoRouter.put(
    '/cateInsumo/:id', checkRole(['Director', 'Secretaria']),
    cateInsumoController.actualizarCateInsumoPorId,
);
cateInsumoRouter.delete(
    '/cateInsumo/:id', checkRole(['Director']),
    cateInsumoController.borrarCateInsumoPorId,
);

export default cateInsumoRouter;