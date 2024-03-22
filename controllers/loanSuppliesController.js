import loanSuppliesRepository from "../repositories/loanSuppliesRepository.js";

const loanSuppliesController = {
    postLoanSupplie: async (req, res) => {
        try {
            const newLoanSupplie = await loanSuppliesRepository.create(req.body);
            res.status(201).json(newLoanSupplie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

};

export default loanSuppliesController;