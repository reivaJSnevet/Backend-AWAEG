import { Router } from 'express';
import gradeController from '../controllers/gradeController.js';

const gradeRouter = Router();

gradeRouter.post('/grades', gradeController.postGrade);
gradeRouter.get('/grades', gradeController.getAllGrades);
gradeRouter.get('/grades/:id', gradeController.getGradeById);
gradeRouter.put('/grades/:id', gradeController.putGrade);
gradeRouter.delete('/grades/:id', gradeController.deleteGrade);

export default gradeRouter;