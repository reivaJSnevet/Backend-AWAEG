import { InstitutionalSupplie } from "../models/index.js";

const institutionalSupplieRepository = {
    create: async (institutionalSupplie) => {
        try {
            const newInstitutionalSupplie = await InstitutionalSupplie.create(institutionalSupplie);
            return newInstitutionalSupplie;
        } catch (error) {
            throw error;
        }
    }, 

    getAll: async () => {
        try {
            const institutionalSupplies = await InstitutionalSupplie.findAll();
            return institutionalSupplies;
        } catch (error) {
            throw error;
        }
    },

    getById: async (institutionalSupplieId) => {
        try {
            const institutionalSupplie = await InstitutionalSupplie.findByPk(institutionalSupplieId);
            return institutionalSupplie;
        } catch (error) {
            throw error;
        }
    },

    update: async (institutionalSupplieId, updatedFields) => {
        try {
            const institutionalSupplieUpdated = await InstitutionalSupplie.update(updatedFields, {
                where: { institutionalSupplieId },
            });
            return institutionalSupplieUpdated;
        } catch (error) {
            throw error;
        }
    },

    delete: async (institutionalSupplieId) => {
        try {
            const institutionalSupplieDeleted = await InstitutionalSupplie.destroy({
                where: { institutionalSupplieId },
            });
            return institutionalSupplieDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default institutionalSupplieRepository;