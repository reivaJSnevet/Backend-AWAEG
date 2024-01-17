import express from 'express';
import LoanController from '../controllers/loanController.js';
import validateModel from '../middlewares/validateModel.js';
import {Loan} from '../models/index.js';

const loanRouter = express.Router();

loanRouter.post('/loans', validateModel(Loan) ,LoanController.postLoan);
loanRouter.get('/loans', LoanController.getAllLoans);
loanRouter.get('/loans/:id', LoanController.getLoanById);
loanRouter.put('/loans/:id',validateModel(Loan), LoanController.putLoan);
loanRouter.delete('/loans/:id', LoanController.deleteLoan);

export default loanRouter;