import functionaryRepository from "../repositories/functionaryRepository.js";

const functionaryService = {
	createFunctionary: async (functionary) => {
		try {
			const newFunctionary =
				await functionaryRepository.create(functionary);
			return newFunctionary;
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

	getAllFunctionaries: async () => {
		try {
			const functionaries = await functionaryRepository.getAll();
			return functionaries;
		} catch (error) {
			throw error;
		}
	},

	getFunctionaryById: async (functionaryId) => {
		try {
			const functionary =
				await functionaryRepository.getById(functionaryId);
			return functionary;
		} catch (error) {
			throw error;
		}
	},

	updateFunctionary: async (functionaryId, updatedFields) => {
		try {
			const functionaryUpdated = await functionaryRepository.update(
				functionaryId,
				updatedFields,
			);
			return functionaryUpdated;
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

	deleteFunctionary: async (functionaryId) => {
		try {
			const functionaryDeleted =
				await functionaryRepository.delete(functionaryId);
			return functionaryDeleted;
		} catch (error) {
			throw error;
		}
	},

	addSubject: async (functionaryId, subjectId) => {
		try {
			const functionary =
				await functionaryRepository.getById(functionaryId);

			if (!functionary || !subjectId) {
				return null;
			} else if (await functionary.hasSubject(subjectId)) {
				return { message: "The functionary already has the subject" };
			}

			if (Array.isArray(subjectId)) {
				return functionaryRepository.addSubjects(
					functionaryId,
					subjectId,
				);
			} else if (subjectId) {
				return functionaryRepository.addSubject(
					functionaryId,
					subjectId,
				);
			}
		} catch (error) {
			throw error;
		}
	},

	deleteSubject: async (functionaryId, subjectId) => {
		try {
			const functionary =
				await functionaryRepository.getById(functionaryId);

			if (!functionary || !subjectId) {
				return null;
			} else if (!(await functionary.hasSubject(subjectId))) {
				return null;
			}

			if (Array.isArray(subjectId)) {
				return await functionaryRepository.deleteSubjects(
					functionaryId,
					subjectId,
				);
			} else if (subjectId) {
				return await functionaryRepository.deleteSubject(
					functionaryId,
					subjectId,
				);
			}
		} catch (error) {
			throw error;
		}
	},
};

export default functionaryService;
