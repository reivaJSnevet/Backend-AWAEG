import express from 'express';
import reporteDañosController from '../controllers/reporteDañosController.js';
import checkRole from '../middlewares/roleMiddleware.js';


const reporteDañosRouter = express.Router();

//Rutas de Reporte de Daños
reporteDañosRouter.get(
    '/reporteDannos', checkRole(['Director']),
    reporteDañosController.obtenerReporteDaños,
);
reporteDañosRouter.post(
    '/reporteDannos', checkRole(['Director', 'Secretaria']),
    reporteDañosController.crearReporteDaños,
);
reporteDañosRouter.get(
    '/reporteDannos/:id', checkRole(['Director']),
    reporteDañosController.obtenerReporteDañosPorId,
);
reporteDañosRouter.put(
    '/reporteDannos/:id', checkRole(['Director']),
    reporteDañosController.actualizarReporteDañosPorId,
);
reporteDañosRouter.delete(
    '/reporteDannos/:id', checkRole(['Director']),
    reporteDañosController.borrarReporteDañosPorId,
);

export default reporteDañosRouter;