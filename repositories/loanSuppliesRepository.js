import { LoanSupplies, Loan, Supplie } from "../models/index.js";

const loanSuppliesRepository = {
    create: async (loanSupplie) => {
        try {
            const newLoanSupplie = await LoanSupplies.create(loanSupplie);
            return newLoanSupplie;
        } catch (error) {
            throw error;
        }
    },
};

export default loanSuppliesRepository;