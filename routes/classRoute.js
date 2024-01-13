import express from 'express';
import classController from '../controllers/classController.js';
import verifyRole from '../middlewares/verifyRole.js';

const classRouter = express.Router();

classRouter.post('/classes', verifyRole(1), classController.postClass);
classRouter.get('/classes', verifyRole(1), classController.getAllClasses);
classRouter.get('/classes/:id', verifyRole(1), classController.getClassById);
classRouter.put('/classes/:id', verifyRole(1), classController.putClass);
classRouter.delete('/classes/:id', verifyRole(1), classController.deleteClass);
classRouter.post('/classes/:id/days', verifyRole(1), classController.addDay);
classRouter.delete('/classes/:id/days', verifyRole(1), classController.deleteDay);


export default classRouter;