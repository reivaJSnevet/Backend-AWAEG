import express from 'express';
import studentSupplieController from '../controllers/studentSupplieController.js';
import validateModel from '../middlewares/validateModel.js';
import {StudentSupplie} from '../models/index.js';

const studentSupplieRouter = express.Router();

studentSupplieRouter.post('/studentSupplies', validateModel(StudentSupplie) ,studentSupplieController.postStudentSupplie);
studentSupplieRouter.get('/studentSupplies', studentSupplieController.getAllStudentSupplies);
studentSupplieRouter.get('/studentSupplies/:id', studentSupplieController.getStudentSupplieById);
studentSupplieRouter.put('/studentSupplies/:id',validateModel(StudentSupplie), studentSupplieController.putStudentSupplie);
studentSupplieRouter.delete('/studentSupplies/:id', studentSupplieController.deleteStudentSupplie);

export default studentSupplieRouter;