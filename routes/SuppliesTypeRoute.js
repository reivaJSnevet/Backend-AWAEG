import { Router } from 'express';
import SuppliesTypeController from '../controllers/suppliesTypeController.js';

const suppliesTypeRouter = Router();

suppliesTypeRouter.post('/supplies-types', SuppliesTypeController.postSuppliesType);
suppliesTypeRouter.get('/supplies-types', SuppliesTypeController.getAllSuppliesType);
suppliesTypeRouter.get('/supplies-types/:id', SuppliesTypeController.getSuppliesTypeById);
suppliesTypeRouter.put('/supplies-types/:id', SuppliesTypeController.putSuppliesType);
suppliesTypeRouter.delete('/supplies-types/:id', SuppliesTypeController.deleteSuppliesType);

export default suppliesTypeRouter;
