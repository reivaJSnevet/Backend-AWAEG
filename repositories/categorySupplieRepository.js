import { CategorySupplie } from "../models/index.js";

const categorySupplieRepository = {
    create: async (categorySupplie) => {
        try {
            const newCategorySupplie = await CategorySupplie.create(categorySupplie);
            return newCategorySupplie;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const categorySupplies = await CategorySupplie.findAll();
            return categorySupplies;
        } catch (error) {
            throw error;
        }
    },

    getById: async (supplieId) => {
        try {
            const categorySupplie = await CategorySupplie.findByPk(supplieId);
            return categorySupplie;
        } catch (error) {
            throw error;
        }
    },

    update: async (supplieId, updatedFields) => {
        try {
            const categorySupplieUpdated = await CategorySupplie.update(updatedFields, {
                where: { supplieId },
            });
            return categorySupplieUpdated;
        } catch (error) {
            throw error;
        }
    },

    delete: async (supplieId) => {
        try {
            const categorySupplieDeleted = await CategorySupplie.destroy({
                where: { supplieId },
            });
            return categorySupplieDeleted;
        } catch (error) {
            throw error;
        }
    },


};

export default categorySupplieRepository;