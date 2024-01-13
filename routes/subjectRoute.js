import express from 'express';
import subjectController from '../controllers/subjectController.js';
import validateModel from '../middlewares/validateModel.js';
import {Subject} from '../models/index.js';
import verifyRole from '../middlewares/verifyRole.js';

const subjectRouter = express.Router();

subjectRouter.post('/subjects', verifyRole(1), validateModel(Subject) ,subjectController.postSubject);
subjectRouter.get('/subjects', verifyRole(1), subjectController.getAllSubjects);
subjectRouter.get('/subjects/:subjectId', verifyRole(1), subjectController.getSubjectById);
subjectRouter.put('/subjects/:subjectId', verifyRole(1), validateModel(Subject), subjectController.putSubject);
subjectRouter.delete('/subjects/:subjectId', verifyRole(1), subjectController.deleteSubject);

export default subjectRouter;