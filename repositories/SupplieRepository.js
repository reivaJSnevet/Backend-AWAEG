import { Supplie } from '../models/index.js';

const supplieRepository = {
    create: async (supplie) => {
        try {
            const newSupplie = await Supplie.create(supplie);
            return newSupplie;
        } catch (error) {
            throw error;
        }
    },
    
    getAll: async () => {
        try {
            const supplies = await Supplie.findAll();
            return supplies;
        } catch (error) {
            throw error;
        }
    },

    getById: async (supplieId) => {
        try {
            const supplie = await Supplie.findByPk(supplieId);
            return supplie;
        } catch (error) {
            throw error;
        }
    },

    update: async (supplieId, updatedFields) => {
        try {
            const supplieUpdated = await Supplie.update(updatedFields, {
                where: { supplieId },
                individualHooks: true,
            });
            return supplieUpdated[1][0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (supplieId) => {
        try {
            const supplieDeleted = await Supplie.destroy({
                where: { supplieId },
            });
            return supplieDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default supplieRepository;
