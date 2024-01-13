import express from 'express';
import FunctionaryController from '../controllers/functionaryController.js';
import validateModel from '../middlewares/validateModel.js';
import {Functionary} from '../models/index.js';
import verifyRole from '../middlewares/verifyRole.js';

const functionaryRouter = express.Router();

functionaryRouter.post('/functionaries', verifyRole(1), validateModel(Functionary) ,FunctionaryController.postFunctionary);
functionaryRouter.get('/functionaries', verifyRole(1), FunctionaryController.getAllFunctionaries);
functionaryRouter.get('/functionaries/:id', verifyRole(1), FunctionaryController.getFunctionaryById);
functionaryRouter.put('/functionaries/:id', verifyRole(1), validateModel(Functionary), FunctionaryController.putFunctionary);
functionaryRouter.delete('/functionaries/:id', verifyRole(1), FunctionaryController.deleteFunctionary);
functionaryRouter.post('/functionaries/:id/subjects', verifyRole(1), FunctionaryController.addSubject);
functionaryRouter.delete('/functionaries/:id/subjects', verifyRole(1), FunctionaryController.deleteSubject);

export default functionaryRouter;