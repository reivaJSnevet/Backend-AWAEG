import express from 'express';
import prestamoController from '../controllers/prestamoController.js';
import checkRole from '../middlewares/roleMiddleware.js';

const prestamoRouter = express.Router();

//Rutas de Prestamo
prestamoRouter.get(
    '/prestamos',
    checkRole(['Director', 'Secretaria']),
    prestamoController.obtenerPrestamos,
);
prestamoRouter.post(
    '/prestamos',
    checkRole(['Director', 'Secretaria', 'Maestra', 'Estudiante']),
    prestamoController.crearPrestamo,
);
prestamoRouter.get(
    '/prestamos/:id',
    checkRole(['Director', 'Secretaria', 'Maestra', 'Estudiante']),
    prestamoController.obtenerPrestamoPorId,
);
prestamoRouter.put(
    '/prestamos/:id',
    checkRole(['Director', 'Secretaria']),
    prestamoController.actualizarPrestamoPorId,
);
prestamoRouter.delete(
    '/prestamos/:id',
    checkRole(['Director', 'Secretaria']),
    prestamoController.eliminarPrestamoPorId,
);

export default prestamoRouter;