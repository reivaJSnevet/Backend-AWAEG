import express from 'express';
import FunctionaryController from '../controllers/functionaryController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { functionarySchemaCreate, functionarySchemaUpdate, functionarySubjectSchema } from '../models/Schemas/functionarySchema.js';

const functionaryRouter = express.Router();

functionaryRouter.post('/functionaries', verifyRole(1), validateSchema(functionarySchemaCreate), FunctionaryController.postFunctionary);
functionaryRouter.get('/functionaries', verifyRole(1), FunctionaryController.getAllFunctionaries);
functionaryRouter.get('/functionaries/:id', verifyRole(1), FunctionaryController.getFunctionaryById);
functionaryRouter.put('/functionaries/:id', verifyRole(1), validateSchema(functionarySchemaUpdate), FunctionaryController.putFunctionary);
functionaryRouter.delete('/functionaries/:id', verifyRole(1), FunctionaryController.deleteFunctionary);
functionaryRouter.post('/functionaries/:id/subjects', verifyRole(1), validateSchema(functionarySubjectSchema), FunctionaryController.addSubject);
functionaryRouter.delete('/functionaries/:id/subjects', verifyRole(1), validateSchema(functionarySubjectSchema), FunctionaryController.deleteSubject);

export default functionaryRouter;