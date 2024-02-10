import subjectRepository from "../repositories/subjectRepository.js";
import { NotFoundError } from "../errors/index.js";

const subjectService = {
	createSubject: async (subject) => {
		try {
			const newSubject = await subjectRepository.create(subject);
			return newSubject;
		} catch (error) {
			throw error;
		}
	},

	getAllSubjects: async () => {
		try {
			const subjects = await subjectRepository.getAll();
			return subjects;
		} catch (error) {
			throw error;
		}
	},

	getSubjectById: async (subjectId) => {
		try {
			const subject = await subjectRepository.getById(subjectId);
			if (!subject) {
				throw new NotFoundError("Subject not found", subjectId);
			}
			return subject;
		} catch (error) {
			throw error;
		}
	},

	updateSubject: async (subjectId, updatedFields) => {
		try {
			const subjectUpdated = await subjectRepository.update(
				subjectId,
				updatedFields,
			);
			if (!subjectUpdated) {
				throw new NotFoundError("Subject not found", subjectId);
			}
			return subjectUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteSubject: async (subjectId) => {
		try {
			const subjectDeleted = await subjectRepository.delete(subjectId);

			if (!subjectDeleted) {
				throw new NotFoundError("Subject not found", subjectId);
			}
			return subjectDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default subjectService;
