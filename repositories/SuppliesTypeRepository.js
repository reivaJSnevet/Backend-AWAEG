import { SuppliesType } from '../models/index.js';

const suppliesTypeRepository = {
    create: async (suppliesType) => {
        try {
            const newSuppliesType = await SuppliesType.create(suppliesType);
            return newSuppliesType;
        } catch (error) {
            throw error;
        }
    },
    
    getAll: async () => {
        try {
            const suppliesTypes = await SuppliesType.findAll();
            return suppliesTypes;
        } catch (error) {
            throw error;
        }
    },

    getById: async (suppliesTypeId) => {
        try {
            const suppliesType = await SuppliesType.findByPk(suppliesTypeId);
            return suppliesType;
        } catch (error) {
            throw error;
        }
    },

    update: async (suppliesTypeId, updatedFields) => {
        try {
            const suppliesTypeUpdated = await SuppliesType.update(updatedFields, {
                where: { suppliesTypeId },
                individualHooks: true,
            });
            return suppliesTypeUpdated[1][0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (suppliesTypeId) => {
        try {
            const suppliesTypeDeleted = await SuppliesType.destroy({
                where: { suppliesTypeId },
            });
            return suppliesTypeDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default suppliesTypeRepository;
