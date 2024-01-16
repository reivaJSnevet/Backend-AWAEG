import express from 'express';
import gradeController from '../controllers/gradeController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { gradeSchemaCreate, gradeSchemaUpdate } from '../models/Schemas/gradeSchema.js';

const gradeRouter = express.Router();

gradeRouter.post('/grades', verifyRole(3), validateSchema(gradeSchemaCreate), gradeController.postGrade);
gradeRouter.get('/grades', verifyRole(3), gradeController.getAllGrades);
gradeRouter.get('/grades/:id', verifyRole(3), gradeController.getGradeById);
gradeRouter.put('/grades/:id', verifyRole(3), validateSchema(gradeSchemaUpdate), gradeController.putGrade);
gradeRouter.delete('/grades/:id', verifyRole(3), gradeController.deleteGrade);

export default gradeRouter;