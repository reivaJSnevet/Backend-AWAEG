import { Router } from 'express';
import ProjectorController from '../controllers/ProyectorController.js';

const projectorRouter = Router();

projectorRouter.post('/projectors', ProjectorController.postProjector);
projectorRouter.get('/projectors', ProjectorController.getAllProjectors);
projectorRouter.get('/projectors/:id', ProjectorController.getProjectorById);
projectorRouter.put('/projectors/:id', ProjectorController.putProjector);
projectorRouter.delete('/projectors/:id', ProjectorController.deleteProjector);

export default projectorRouter;
