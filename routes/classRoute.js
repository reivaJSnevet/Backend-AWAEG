import { Router } from 'express';
import classController from '../controllers/classController.js';

const classRouter = Router();

classRouter.post('/classes', classController.postClass);
classRouter.get('/classes', classController.getAllClasses);
classRouter.get('/classes/:id', classController.getClassById);
classRouter.put('/classes/:id', classController.putClass);
classRouter.delete('/classes/:id', classController.deleteClass);

export default classRouter;