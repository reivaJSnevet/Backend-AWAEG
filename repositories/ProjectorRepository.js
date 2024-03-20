import { Projector } from '../models/index.js';

const projectorRepository = {
    create: async (projector) => {
        try {
            const newProjector = await Projector.create(projector);
            return newProjector;
        } catch (error) {
            throw error;
        }
    },
    
    getAll: async () => {
        try {
            const projectors = await Projector.findAll();
            return projectors;
        } catch (error) {
            throw error;
        }
    },

    getById: async (projectorId) => {
        try {
            const projector = await Projector.findByPk(projectorId);
            return projector;
        } catch (error) {
            throw error;
        }
    },

    update: async (projectorId, updatedFields) => {
        try {
            const projectorUpdated = await Projector.update(updatedFields, {
                where: { projectorId },
                individualHooks: true,
            });
            return projectorUpdated[1][0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (projectorId) => {
        try {
            const projectorDeleted = await Projector.destroy({
                where: { projectorId },
            });
            return projectorDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default projectorRepository;
