import subjectRepository from "../repositories/subjectRepository.js";

const subjectService = {
	createSubject: async (subject) => {
		try {
			const newSubject = await subjectRepository.create(subject);
			return newSubject;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push(e.message);
				});
			} else {
				throw error;
			}

			throw errors;
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
			return subjectUpdated;
		} catch (error) {
			const errors = [];
			if (error.name === "SequelizeUniqueConstraintError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "UniqueConstraintError",
						message: e.message,
						field: e.path,
					});
				});
			} else if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "ValidationError",
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

	deleteSubject: async (subjectId) => {
		try {
			const subjectDeleted = await subjectRepository.delete(subjectId);
			return subjectDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default subjectService;
