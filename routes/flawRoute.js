import { Router } from 'express';
import FlawController from '../controllers/flawController.js';

const flawRouter = Router();

flawRouter.post('/flaws', FlawController.postFlaw);
flawRouter.get('/flaws', FlawController.getAllFlaws);
flawRouter.get('/flaws/:id', FlawController.getFlawById);
flawRouter.put('/flaws/:id', FlawController.putFlaw);
flawRouter.delete('/flaws/:id', FlawController.deleteFlaw);

export default flawRouter;