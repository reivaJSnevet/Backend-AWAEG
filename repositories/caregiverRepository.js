import {Caregiver} from "../models/index.js";

const caregiverRepository = {
    create: async (caregiver) => {
        try {
            const newCaregiver = await Caregiver.create(caregiver);
            return newCaregiver;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const caregivers = await Caregiver.findAll();
            return caregivers;
        } catch (error) {
            throw error;
        }
    },

    getById: async (caregiverId) => {
        try {
            const caregiver = await Caregiver.findByPk(caregiverId);
            return caregiver;
        } catch (error) {
            throw error;
        }
    },

    update: async (caregiverId, updatedFields) => {
        try {
            const caregiverUpdated = await Caregiver.update(updatedFields, {
                where: { caregiverId: caregiverId },
            });
            return caregiverUpdated[0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (caregiverId) => {
        try {
            const caregiverDeleted = await Caregiver.destroy({
                where: { caregiverId: caregiverId },
            });
            return caregiverDeleted;
        } catch (error) {
            throw error;
        }
    },

};

export default caregiverRepository;