import categorySupplieRepository from "../repositories/categorySupplieRepository.js";

const categorySupplieService = {
    createCategorySupplie: async (categorySupplie) => {
        try {
            const newCategorySupplie = await categorySupplieRepository.create(categorySupplie);
            return newCategorySupplie;
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

    getAllCategorySupplies: async () => {
        try {
            const categorySupplies = await categorySupplieRepository.getAll();
            return categorySupplies;
        } catch (error) {
            throw error;
        }
    },

    getCategorySupplieById: async (categorySupplieId) => {
        try {
            const categorySupplie =
                await categorySupplieRepository.getById(categorySupplieId);
            return categorySupplie;
        } catch (error) {
            throw error;
        }
    },

    updateCategorySupplie: async (categorySupplieId, updatedFields) => {
        try {
            const categorySupplieUpdated = await categorySupplieRepository.update(
                categorySupplieId,
                updatedFields,
            );
            return categorySupplieUpdated[0];
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

    deleteCategorySupplie: async (categorySupplieId) => {
        try {
            const categorySupplieDeleted = await categorySupplieRepository.delete(
                categorySupplieId,
            );
            return categorySupplieDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default categorySupplieService;