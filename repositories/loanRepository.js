import { Loan } from '../models/index.js';

const loanRepository = {
    create: async (loan) => {
        try {
            const newLoan = await Loan.create(loan);
            return newLoan;
        } catch (error) {
            throw error;
        }
    },
    
    getAll: async () => {
        try {
            const loans = await Loan.findAll();
            return loans;
        } catch (error) {
            throw error;
        }
    },

    getById: async (loanId) => {
        try {
            const loan = await Loan.findByPk(loanId);
            return loan;
        } catch (error) {
            throw error;
        }
    },

    update: async (loanId, updatedFields) => {
        try {
            const loanUpdated = await Loan.update(updatedFields, {
                where: { loanId },
                individualHooks: true,
            });
            return loanUpdated[1][0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (loanId) => {
        try {
            const loanDeleted = await Loan.destroy({
                where: { loanId },
            });
            return loanDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default loanRepository;