import express from 'express';
import preRegistrationController from '../controllers/preRegistrationController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { preRegistrationSchemaCreate, preRegistrationSchemaUpdate } from '../models/Schemas/preRegistrationSchema.js';

const preRegistrationRouter = express.Router();

preRegistrationRouter.post('/preRegistrations', verifyRole(5), validateSchema(preRegistrationSchemaCreate), preRegistrationController.postPreRegistration);
preRegistrationRouter.get('/preRegistrations', verifyRole(2), preRegistrationController.getAllPreRegistrations);
preRegistrationRouter.get('/preRegistrations/:id', verifyRole(3), preRegistrationController.getPreRegistrationById);
preRegistrationRouter.put('/preRegistrations/:id', verifyRole(3), validateSchema(preRegistrationSchemaUpdate), preRegistrationController.putPreRegistration);
preRegistrationRouter.delete('/preRegistrations/:id', verifyRole(3), preRegistrationController.deletePreRegistration);

export default preRegistrationRouter;
