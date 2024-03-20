import { ElectronicSupplies } from '../models/index.js';

const electronicSuppliesRepository = {
    create: async (electronicSupplies) => {
        try {
            const newElectronicSupplies = await ElectronicSupplies.create(electronicSupplies);
            return newElectronicSupplies;
        } catch (error) {
            throw error;
        }
    },
    
    getAll: async () => {
        try {
            const electronicSupplies = await ElectronicSupplies.findAll();
            return electronicSupplies;
        } catch (error) {
            throw error;
        }
    },

    getById: async (electronicSuppliesId) => {
        try {
            const electronicSupplies = await ElectronicSupplies.findByPk(electronicSuppliesId);
            return electronicSupplies;
        } catch (error) {
            throw error;
        }
    },

    update: async (electronicSuppliesId, updatedFields) => {
        try {
            const electronicSuppliesUpdated = await ElectronicSupplies.update(updatedFields, {
                where: { electronicSuppliesId },
                individualHooks: true,
            });
            return electronicSuppliesUpdated[1][0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (electronicSuppliesId) => {
        try {
            const electronicSuppliesDeleted = await ElectronicSupplies.destroy({
                where: { electronicSuppliesId },
            });
            return electronicSuppliesDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default electronicSuppliesRepository;
