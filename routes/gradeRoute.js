import express from 'express';
import gradeController from '../controllers/gradeController.js';
import validateModel from '../middlewares/validateModel.js';
import { Grade } from '../models/index.js';
import verifyRole from '../middlewares/verifyRole.js';

const gradeRouter = express.Router();

gradeRouter.post('/grades', verifyRole(3), validateModel(Grade), gradeController.postGrade);
gradeRouter.get('/grades', verifyRole(3), gradeController.getAllGrades);
gradeRouter.get('/grades/:id', verifyRole(3), gradeController.getGradeById);
gradeRouter.put('/grades/:id', verifyRole(3), validateModel(Grade), gradeController.putGrade);
gradeRouter.delete('/grades/:id', verifyRole(3), gradeController.deleteGrade);

export default gradeRouter;