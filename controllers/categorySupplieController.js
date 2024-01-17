import categorySupplieService from "../services/categorySupplieService.js";

const categorySupplieController = {
    postCategorySupplie: async (req, res) => {
        try {
            const newCategorySupplie = await categorySupplieService.createCategorySupplie(
                req.body,
            );
            res.status(201).json(newCategorySupplie);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error creating categorySupplie",
                    message: error.message,
                });
            }
        }
    },

    getAllCategorySupplies: async (req, res) => {
        try {
            const categorySupplies = await categorySupplieService.getAllCategorySupplies();
            res.status(200).json(categorySupplies);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving categorySupplies",
                message: error.message,
            });
        }
    },

    getCategorySupplieById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing categorySupplie ID",
                    message: "You must specify a categorySupplie ID to retrieve it",
                });
            }

            const categorySupplie = await categorySupplieService.getCategorySupplieById(
                req.params.id,
            );

            if (categorySupplie) {
                return res.status(200).json(categorySupplie);
            } else {
                return res.status(404).json({
                    error: `CategorySupplie not found`,
                    message: `No categorySupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving categorySupplie",
                message: error.message,
            });
        }
    },

    putCategorySupplie: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing categorySupplie ID",
                    message: "You must specify a categorySupplie ID to update it",
                });
            }

            const updatedCategorySupplie = await categorySupplieService.updateCategorySupplie(
                req.params.id,
                req.body,
            );

            if (updatedCategorySupplie) {
                return res.status(200).json(updatedCategorySupplie);
            } else {
                return res.status(404).json({
                    error: `CategorySupplie not found`,
                    message: `No categorySupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error updating categorySupplie",
                    message: error.message,
                });
            }
        }
    },

    deleteCategorySupplie: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing categorySupplie ID",
                    message: "You must specify a categorySupplie ID to delete it",
                });
            }

            const categorySupplieDeleted = await categorySupplieService.deleteCategorySupplie(
                req.params.id,
            );

            if (categorySupplieDeleted) {
                return res.status(200).json({
                    message: `CategorySupplie with ID '${req.params.id}' deleted`,
                });
            } else {
                return res.status(404).json({
                    error: `CategorySupplie not found`,
                    message: `No categorySupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "Error deleting categorySupplie",
                message: error.message,
            });
        }
    },
};

export default categorySupplieController;