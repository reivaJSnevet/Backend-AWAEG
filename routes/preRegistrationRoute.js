import { Router } from 'express';
import preRegistrationController from '../controllers/preRegistrationController.js';

const preRegistrationRouter = Router();

preRegistrationRouter.post('/preRegistrations', preRegistrationController.postPreRegistration);
preRegistrationRouter.get('/preRegistrations', preRegistrationController.getAllPreRegistrations);
preRegistrationRouter.get('/preRegistrations/:id', preRegistrationController.getPreRegistrationById);
preRegistrationRouter.put('/preRegistrations/:id', preRegistrationController.putPreRegistration);
preRegistrationRouter.delete('/preRegistrations/:id', preRegistrationController.deletePreRegistration);

export default preRegistrationRouter;
