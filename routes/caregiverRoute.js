import { Router } from 'express';
import caregiverController from '../controllers/caregiverController.js';

const caregiverRouter = Router();

caregiverRouter.post('/caregivers', caregiverController.postCaregiver);
caregiverRouter.get('/caregivers', caregiverController.getAllCaregivers);
caregiverRouter.get('/caregivers/:id', caregiverController.getCaregiverById);
caregiverRouter.put('/caregivers/:id', caregiverController.putCaregiver);
caregiverRouter.delete('/caregivers/:id', caregiverController.deleteCaregiver);

export default caregiverRouter;