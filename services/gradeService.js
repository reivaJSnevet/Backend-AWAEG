import gradeRepository from "../repositories/gradeRepository.js";

const gradeService = {
	createGrade: async (grade) => {
		try {
			const newGrade = await gradeRepository.create(grade);
			return newGrade;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeValidationError") {
				error.errors.forEach((error) => {
					errors.push(error.message);
				});
			} else {
				throw error;
			}

			throw errors;
		}
	},
    getAllGrades: async () => {
        try {
            const grades = await gradeRepository.getAll();
            return grades;
        } catch (error) {
            throw error;
        }
    },
    getGradeById: async (gradeId) => {
        try {
            const grade = await gradeRepository.getById(gradeId);
            return grade;
        } catch (error) {
            throw error;
        }
    },  
    updateGrade: async (gradeId, updatedFields) => {
        try {
            const gradeUpdated = await gradeRepository.update(gradeId, updatedFields);
            return gradeUpdated;
        } catch (error) {
            const errors = [];

            if (error.name === "SequelizeValidationError") {
                error.errors.forEach((error) => {
                    errors.push(error.message);
                });
            } else {
                throw error;
            }

            throw errors;
        }
    },
    deleteGrade: async (gradeId) => {
        try {
            const gradeDeleted = await gradeRepository.delete(gradeId);
            return gradeDeleted;
        } catch (error) {
            throw error;
        }
    }
};

export default gradeService;
