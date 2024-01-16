import express from 'express';
import classController from '../controllers/classController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { classSchemaCreate, classSchemaUpdate } from '../models/Schemas/classSchema.js';

const classRouter = express.Router();

classRouter.post('/classes', verifyRole(1), validateSchema(classSchemaCreate), classController.postClass);
classRouter.get('/classes', verifyRole(1), classController.getAllClasses);
classRouter.get('/classes/:id', verifyRole(1), classController.getClassById);
classRouter.put('/classes/:id', verifyRole(1), validateSchema(classSchemaUpdate), classController.putClass);
classRouter.delete('/classes/:id', verifyRole(1), classController.deleteClass);

export default classRouter;