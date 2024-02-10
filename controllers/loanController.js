import loanService from "../services/loanService.js";

const loanController = {
	postLoan: async (req, res, next) => {
		try {
			const newLoan = await loanService.createLoan(req.body);
			res.status(201).json(newLoan);
		} catch (error) {
			next(error);
		}
	},
	getAllLoans: async (req, res, next) => {
		try {
			const loans = await loanService.getAllLoans();
			res.status(200).json(loans);
		} catch (error) {
			next(error);
		}
	},
	getLoanById: async (req, res, next) => {
		try {
			const loan = await loanService.getLoanById(req.params.id);
			res.status(200).json(loan);
		} catch (error) {
			next(error);
		}
	},
	putLoan: async (req, res, next) => {
		try {
			const loan = await loanService.updateLoan(req.params.id, req.body);
			res.status(200).json(loan);
		} catch (error) {
			next(error);
		}
	},
	deleteLoan: async (req, res, next) => {
		try {
			const loan = await loanService.deleteLoan(req.params.id);
			res.status(200).json(loan);
		} catch (error) {
			next(error);
		}
	},
};

export default loanController;
