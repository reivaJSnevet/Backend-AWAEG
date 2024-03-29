import { Router } from 'express';
import SupplieController from '../controllers/SupplieController.js';

const supplieRouter = Router();

supplieRouter.post('/supplies', SupplieController.postSupplie);
supplieRouter.get('/supplies', SupplieController.getAllSupplies);
supplieRouter.get('/supplies/active', SupplieController.getAllActiveSupplies);
supplieRouter.get('/supplies/:id', SupplieController.getSupplieById);
supplieRouter.put('/supplies/:id', SupplieController.putSupplie);
supplieRouter.delete('/supplies/:id', SupplieController.deleteSupplie);

export default supplieRouter;
