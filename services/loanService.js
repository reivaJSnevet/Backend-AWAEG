import loanRepository from "../repositories/loanRepository.js";

const loanService = {
	createLoan: async (loan) => {
		try {
			const newLoan = await loanRepository.create(loan);
			return newLoan;
		} catch (error) {
			const errors = [];
			if (error.name === "SequelizeUniqueConstraintError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "Unique Constraint Error",
						message: e.message,
						field: e.path,
					});
				});
			} else if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "Validation Error",
						message: e.message,
						field: e.path,
					});
				});
			} else {
				throw error;
			}
			throw errors;
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
			return loanUpdated[0];
		} catch (error) {
			const errors = [];
			if (error.name === "SequelizeUniqueConstraintError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "Unique Constraint Error",
						message: e.message,
						field: e.path,
					});
				});
			} else if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "Validation Error",
						message: e.message,
						field: e.path,
					});
				});
			} else {
				throw error;
			}
			throw errors;
		}
	},

	deleteLoan: async (loanId) => {
		try {
			const loanDeleted = await loanRepository.delete(loanId);
			return loanDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default loanService;
