import institutionalSupplieService from "../services/institutionalSupplieService.js";

const institutionalSupplieController = {
    postInstitutionalSupplie: async (req, res) => {
        try {
            const newInstitutionalSupplie = await institutionalSupplieService.createInstitucionalSupplie(
                req.body,
            );
            res.status(201).json(newInstitutionalSupplie);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error creating institutionalSupplie",
                    message: error.message,
                });
            }
            console.log(error)
        }
    },

    getAllInstitutionalSupplies: async (req, res) => {
        try {
            const institutionalSupplies = await institutionalSupplieService.getAllInstitutionalSupplies();
            res.status(200).json(institutionalSupplies);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving institutionalSupplies",
                message: error.message,
            });
        }
    },

    getInstitutionalSupplieById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing institutionalSupplie ID",
                    message: "You must specify a institutionalSupplie ID to retrieve it",
                });
            }

            const institutionalSupplie = await institutionalSupplieService.getInstitutionalSupplieById(
                req.params.id,
            );

            if (institutionalSupplie) {
                return res.status(200).json(institutionalSupplie);
            } else {
                return res.status(404).json({
                    error: `InstitutionalSupplie not found`,
                    message: `No institutionalSupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving institutionalSupplie",
                message: error.message,
            });
        }
    },

    putInstitutionalSupplie: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing institutionalSupplie ID",
                    message: "You must specify a institutionalSupplie ID to retrieve it",
                });
            }

            const institutionalSupplie = await institutionalSupplieService.updateInstitutionalSupplie(
                req.params.id,
                req.body,
            );

            if (institutionalSupplie) {
                return res.status(200).json(institutionalSupplie);
            } else {
                return res.status(404).json({
                    error: `InstitutionalSupplie not found`,
                    message: `No institutionalSupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error updating institutionalSupplie",
                message: error.message,
            });
        }
    },

    deleteInstitutionalSupplie: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing institutionalSupplie ID",
                    message: "You must specify a institutionalSupplie ID to retrieve it",
                });
            }

            const institutionalSupplie = await institutionalSupplieService.deleteInstitutionalSupplie(
                req.params.id,
            );

            if (institutionalSupplie) {
                return res.status(200).json(institutionalSupplie);
            } else {
                return res.status(404).json({
                    error: `InstitutionalSupplie not found`,
                    message: `No institutionalSupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error deleting institutionalSupplie",
                message: error.message,
            });
        }
    },
};

export default institutionalSupplieController;