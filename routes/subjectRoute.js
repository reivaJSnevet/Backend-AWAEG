import express from 'express';
import subjectController from '../controllers/subjectController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { subjectSchemaCreate, subjectSchemaUpdate } from '../models/Schemas/subjectSchema.js';
const subjectRouter = express.Router();

subjectRouter.post('/subjects', verifyRole(1), validateSchema(subjectSchemaCreate), subjectController.postSubject);
subjectRouter.get('/subjects', verifyRole(1), subjectController.getAllSubjects);
subjectRouter.get('/subjects/:subjectId', verifyRole(1), subjectController.getSubjectById);
subjectRouter.put('/subjects/:subjectId', verifyRole(1), validateSchema(subjectSchemaUpdate), subjectController.putSubject);
subjectRouter.delete('/subjects/:subjectId', verifyRole(1), subjectController.deleteSubject);

export default subjectRouter;