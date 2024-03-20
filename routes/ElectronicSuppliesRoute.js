import { Router } from 'express';
import ElectronicSuppliesController from '../controllers/electronicSuppliesController.js';

const electronicSuppliesRouter = Router();

electronicSuppliesRouter.post('/electronic-supplies', ElectronicSuppliesController.postElectronicSupplies);
electronicSuppliesRouter.get('/electronic-supplies', ElectronicSuppliesController.getAllElectronicSupplies);
electronicSuppliesRouter.get('/electronic-supplies/:id', ElectronicSuppliesController.getElectronicSuppliesById);
electronicSuppliesRouter.put('/electronic-supplies/:id', ElectronicSuppliesController.putElectronicSupplies);
electronicSuppliesRouter.delete('/electronic-supplies/:id', ElectronicSuppliesController.deleteElectronicSupplies);

export default electronicSuppliesRouter;
