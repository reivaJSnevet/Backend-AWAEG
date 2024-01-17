import institutionalSupplieRepository from "../repositories/institutionalSupplieRepository.js";

const institutionalSupplieService = {
    createInstitucionalSupplie: async (institutionalSupplie) => {
        try {
            const newInstitutionalSupplie = await institutionalSupplieRepository.create(institutionalSupplie);
            return newInstitutionalSupplie;
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

    getAllInstitutionalSupplies: async () => {
        try {
            const institutionalSupplies = await institutionalSupplieRepository.getAll();
            return institutionalSupplies;
        } catch (error) {
            throw error;
        }
    },

    getInstitutionalSupplieById: async (institutionalSupplieId) => {
        try {
            const institutionalSupplie = await institutionalSupplieRepository.getById(institutionalSupplieId);
            return institutionalSupplie;
        } catch (error) {
            throw error;
        }
    },

    updateInstitutionalSupplie: async (institutionalSupplieId, updatedFields) => {
        try {
            const institutionalSupplieUpdated = await institutionalSupplieRepository.update(institutionalSupplieId, updatedFields);
            return institutionalSupplieUpdated[0];
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

    deleteInstitutionalSupplie: async (institutionalSupplieId) => {
        try {
            const institutionalSupplieDeleted = await institutionalSupplieRepository.delete(institutionalSupplieId);
            return institutionalSupplieDeleted;
        } catch (error) {
            throw error;
        }
    },

};

export default institutionalSupplieService;