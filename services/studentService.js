import studentRepository from "../repositories/studentRepository.js";

const studentService = {
    createStudent: async (student) => {
        try {
            const newStudent = await studentRepository.create(student);
            return newStudent;
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

    getAllStudents: async () => {
        try {
            const students = await studentRepository.getAll();
            return students;
        } catch (error) {
            throw error;
        }
    },

    getStudentById: async (studentId) => {
        try {
            const student =
                await studentRepository.getById(studentId);
            return student;
        } catch (error) {
            throw error;
        }
    },

    updateStudent: async (studentId, updatedFields) => {
        try {
            const studentUpdated = await studentRepository.update(
                studentId,
                updatedFields,
            );
            return studentUpdated;
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

    deleteStudent: async (studentId) => {
        try {
            const studentDeleted = await studentRepository.delete(studentId);
            return studentDeleted;
        } catch (error) {
            throw error;
        }
    },
};

export default studentService;