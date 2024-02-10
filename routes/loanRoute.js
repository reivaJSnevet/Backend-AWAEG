import { Router } from 'express';
import LoanController from '../controllers/loanController.js';

const loanRouter = Router();

loanRouter.post('/loans', LoanController.postLoan);
loanRouter.get('/loans', LoanController.getAllLoans);
loanRouter.get('/loans/:id', LoanController.getLoanById);
loanRouter.put('/loans/:id', LoanController.putLoan);
loanRouter.delete('/loans/:id', LoanController.deleteLoan);

export default loanRouter;