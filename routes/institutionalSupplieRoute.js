import express from 'express';
import InstitutionalSupplieController from '../controllers/institutionalSupplieController.js';
import validateModel from '../middlewares/validateModel.js';
import {InstitutionalSupplie} from '../models/index.js';

const institutionalSupplieRouter = express.Router();

institutionalSupplieRouter.post('/institutionalSupplies', validateModel(InstitutionalSupplie) ,InstitutionalSupplieController.postInstitutionalSupplie);
institutionalSupplieRouter.get('/institutionalSupplies', InstitutionalSupplieController.getAllInstitutionalSupplies);
institutionalSupplieRouter.get('/institutionalSupplies/:id', InstitutionalSupplieController.getInstitutionalSupplieById);
institutionalSupplieRouter.put('/institutionalSupplies/:id',validateModel(InstitutionalSupplie), InstitutionalSupplieController.putInstitutionalSupplie);
institutionalSupplieRouter.delete('/institutionalSupplies/:id', InstitutionalSupplieController.deleteInstitutionalSupplie);

export default institutionalSupplieRouter;