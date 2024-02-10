import loanRepository from "../repositories/loanRepository.js";
import { NotFoundError } from "../errors/index.js";

const loanService = {
	createLoan: async (loan) => {
		try {
			const newLoan = await loanRepository.create(loan);
			return newLoan;
		} catch (error) {
			throw error;
		}
	},

	getAllLoans: async () => {
		try {
			const loans = await loanRepository.getAll();
			return loans;
		} catch (error) {
			throw error;
		}
	},

	getLoanById: async (loanId) => {
		try {
			const loan = await loanRepository.getById(loanId);
			if (!loan) {
				throw new NotFoundError("Loan", loanId);
			}

			return loan;
		} catch (error) {
			throw error;
		}
	},

	updateLoan: async (loanId, updatedFields) => {
		try {
			const loanUpdated = await loanRepository.update(
				loanId,
				updatedFields,
			);
			if (!loanUpdated) {
				throw new NotFoundError("Loan", loanId);
			}

			return loanUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteLoan: async (loanId) => {
		try {
			const loanDeleted = await loanRepository.delete(loanId);
			if (!loanDeleted) {
				throw new NotFoundError("Loan", loanId);
			}

			return loanDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default loanService;
