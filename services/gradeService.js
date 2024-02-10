import gradeRepository from "../repositories/gradeRepository.js";
import { NotFoundError } from "../errors/index.js";

const gradeService = {
	createGrade: async (grade) => {
		try {
			const newGrade = await gradeRepository.create(grade);
			return newGrade;
		} catch (error) {
			throw error;
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
            if (!grade) {
                throw new NotFoundError("Grade", gradeId);
            }

            return grade;
        } catch (error) {
            throw error;
        }
    },  
    updateGrade: async (gradeId, updatedFields) => {
        try {
            const gradeUpdated = await gradeRepository.update(gradeId, updatedFields);
            if (!gradeUpdated) {
                throw new NotFoundError("Grade", gradeId);
            }

            return gradeUpdated;
        } catch (error) {
            throw error;
        }
    },
    deleteGrade: async (gradeId) => {
        try {
            const gradeDeleted = await gradeRepository.delete(gradeId);
            if (!gradeDeleted) {
                throw new NotFoundError("Grade", gradeId);
            }

            return gradeDeleted;
        } catch (error) {
            throw error;
        }
    }
};

export default gradeService;
