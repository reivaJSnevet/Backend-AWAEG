import express from 'express';
import CategorySupplieController from '../controllers/categorySupplieController.js';
import validateModel from '../middlewares/validateModel.js';
import {CategorySupplie} from '../models/index.js';

const categorySupplieRouter = express.Router();

categorySupplieRouter.post('/categorySupplies', validateModel(CategorySupplie) ,CategorySupplieController.postCategorySupplie);
categorySupplieRouter.get('/categorySupplies', CategorySupplieController.getAllCategorySupplies);
categorySupplieRouter.get('/categorySupplies/:id', CategorySupplieController.getCategorySupplieById);
categorySupplieRouter.put('/categorySupplies/:id',validateModel(CategorySupplie), CategorySupplieController.putCategorySupplie);
categorySupplieRouter.delete('/categorySupplies/:id', CategorySupplieController.deleteCategorySupplie);

export default categorySupplieRouter;