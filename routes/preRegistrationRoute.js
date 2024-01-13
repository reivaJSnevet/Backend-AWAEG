import express from 'express';
import preRegistrationController from '../controllers/preRegistrationController.js';
import validateModel from '../middlewares/validateModel.js';
import {PreRegistration} from '../models/index.js';
import verifyRole from '../middlewares/verifyRole.js';

const preRegistrationRouter = express.Router();

preRegistrationRouter.post('/preRegistrations', verifyRole(5), validateModel(PreRegistration) ,preRegistrationController.postPreRegistration);
preRegistrationRouter.get('/preRegistrations', verifyRole(2), preRegistrationController.getAllPreRegistrations);
preRegistrationRouter.get('/preRegistrations/:id', verifyRole(3), verifyRole(), preRegistrationController.getPreRegistrationById);
preRegistrationRouter.put('/preRegistrations/:id', verifyRole(3), validateModel(PreRegistration), preRegistrationController.putPreRegistration);
preRegistrationRouter.delete('/preRegistrations/:id', verifyRole(3), preRegistrationController.deletePreRegistration);

export default preRegistrationRouter;
