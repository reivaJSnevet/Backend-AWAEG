import { Flaw } from '../models/index.js';

const flawRepository = {
    create: async (flaw) => {
        try {
            const newFlaw = await Flaw.create(flaw);
            return newFlaw;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const flaws = await Flaw.findAll();
            return flaws;
        } catch (error) {
            throw error;
        }
    },

    getById: async (flawId) => {
        try {
            const flaw = await Flaw.findByPk(flawId);
            return flaw;
        } catch (error) {
            throw error;
        }
    },

    update: async (flawId, updatedFields) => {
        try {
            const flawUpdated = await Flaw.update(updatedFields, {
                where: { flawId },
            });
            return flawUpdated;
        } catch (error) {
            throw error;
        }
    },

    delete: async (flawId) => {
        try {
            const flawDeleted = await Flaw.destroy({
                where: { flawId },
            });
            return flawDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default flawRepository;