import { StudentSupplie } from '../models/index.js';

const studentSupplieRepository = {
    create: async (studentSupplie) => {
        try {
            const newStudentSupplie = await StudentSupplie.create(studentSupplie);
            return newStudentSupplie;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const studentSupplies = await StudentSupplie.findAll();
            return studentSupplies;
        } catch (error) {
            throw error;
        }
    },

    getById: async (studentSupplieId) => {
        try {
            const studentSupplie = await StudentSupplie.findByPk(studentSupplieId);
            return studentSupplie;
        } catch (error) {
            throw error;
        }
    },

    update: async (studentSupplieId, updatedFields) => {
        try {
            const studentSupplieUpdated = await StudentSupplie.update(updatedFields, {
                where: { studentSupplieId },
            });
            return studentSupplieUpdated;
        } catch (error) {
            throw error;
        }
    },

    delete: async (studentSupplieId) => {
        try {
            const studentSupplieDeleted = await StudentSupplie.destroy({
                where: { studentSupplieId },
            });
            return studentSupplieDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default studentSupplieRepository;