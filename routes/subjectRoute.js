import { Router } from 'express';
import subjectController from '../controllers/subjectController.js';

const subjectRouter = Router();

subjectRouter.post('/subjects', subjectController.postSubject);
subjectRouter.get('/subjects', subjectController.getAllSubjects);
subjectRouter.get('/subjects/:subjectId', subjectController.getSubjectById);
subjectRouter.put('/subjects/:subjectId', subjectController.putSubject);
subjectRouter.delete('/subjects/:subjectId', subjectController.deleteSubject);

export default subjectRouter;