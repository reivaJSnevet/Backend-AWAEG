import studentSupplieRepository from "../repositories/studentSupplieRepository.js";

const studentSupplieService = {
    createStudentSupplie: async (studentSupplie) => {
        try {
            const newStudentSupplie = await studentSupplieRepository.create(studentSupplie);
            return newStudentSupplie;
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

    getAllStudentSupplies: async () => {
        try {
            const studentSupplies = await studentSupplieRepository.getAll();
            return studentSupplies;
        } catch (error) {
            throw error;
        }
    },

    getStudentSupplieById: async (studentSupplieId) => {
        try {
            const studentSupplie =
                await studentSupplieRepository.getById(studentSupplieId);
            return studentSupplie;
        } catch (error) {
            throw error;
        }
    },

    updateStudentSupplie: async (studentSupplieId, updatedFields) => {
        try {
            const studentSupplieUpdated = await studentSupplieRepository.update(
                studentSupplieId,
                updatedFields,
            );
            return studentSupplieUpdated[0];
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

    deleteStudentSupplie: async (studentSupplieId) => {
        try {
            const studentSupplieDeleted = await studentSupplieRepository.delete(
                studentSupplieId,
            );
            return studentSupplieDeleted;
        } catch (error) {
            throw error;
        }
    },

};

export default studentSupplieService;