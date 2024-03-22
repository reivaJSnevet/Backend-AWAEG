import { Router } from 'express';
import LoanController from '../controllers/loanController.js';
import loanSuppliesController from '../controllers/loanSuppliesController.js';

const loanRouter = Router();

loanRouter.post('/loans', LoanController.postLoan);
loanRouter.get('/loans', LoanController.getAllLoans);
loanRouter.get('/loans/:id', LoanController.getLoanById);
loanRouter.put('/loans/:id', LoanController.putLoan);
loanRouter.delete('/loans/:id', LoanController.deleteLoan);
loanRouter.post('/loans/supplies', loanSuppliesController.postLoanSupplie);

export default loanRouter;