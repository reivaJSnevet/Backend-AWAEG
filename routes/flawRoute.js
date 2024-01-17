import express from 'express';
import FlawController from '../controllers/flawController.js';
import validateModel from '../middlewares/validateModel.js';
import {Flaw} from '../models/index.js';

const flawRouter = express.Router();

flawRouter.post('/flaws', validateModel(Flaw) ,FlawController.postFlaw);
flawRouter.get('/flaws', FlawController.getAllFlaws);
flawRouter.get('/flaws/:id', FlawController.getFlawById);
flawRouter.put('/flaws/:id',validateModel(Flaw), FlawController.putFlaw);
flawRouter.delete('/flaws/:id', FlawController.deleteFlaw);

export default flawRouter;