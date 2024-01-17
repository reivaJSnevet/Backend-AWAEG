import loanService from "../services/loanService.js";

const loanController = {
    postLoan: async (req, res) => {
        try {
            const newLoan = await loanService.createLoan(
                req.body,
            );
            res.status(201).json(newLoan);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error creating loan",
                    message: error.message,
                });
            }
            console.log(error)
        }
    },
    getAllLoans: async (req, res) => {
        try {
            const loans = await loanService.getAllLoans();
            res.status(200).json(loans);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving loans",
                message: error.message,
            });
        }
    },
    getLoanById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing loan ID",
                    message: "You must specify a loan ID to retrieve it",
                });
            }

            const loan = await loanService.getLoanById(
                req.params.id,
            );

            if (loan) {
                return res.status(200).json(loan);
            } else {
                return res.status(404).json({
                    error: `Loan not found`,
                    message: `No loan found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving loan",
                message: error.message,
            });
        }
    },
    putLoan: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing loan ID",
                    message: "You must specify a loan ID to update it",
                });
            }

            const updatedLoan = await loanService.updateLoan(
                req.params.id,
                req.body,
            );

            if (updatedLoan) {
                return res.status(200).json(updatedLoan);
            } else {
                return res.status(404).json({
                    error: `Loan not found`,
                    message: `No loan found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error updating loan",
                message: error.message,
            });
        }
    },

    deleteLoan: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing loan ID",
                    message: "You must specify a loan ID to delete it",
                });
            }

            const deletedLoan = await loanService.deleteLoan(req.params.id);

            if (deletedLoan) {
                return res.status(200).json({
                    message: `Loan '${req.params.id}' deleted successfully`,
                });
            } else {
                return res.status(404).json({
                    error: `Loan not found`,
                    message: `No loan found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error deleting loan",
                message: error.message,
            });
        }
    },
};

export default loanController;