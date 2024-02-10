import functionaryRepository from "../repositories/functionaryRepository.js";
import personRepository from "../repositories/personRepository.js";
import { NotFoundError } from "../errors/index.js";

const functionaryService = {
	createFunctionary: async (functionary) => {
		try {
			const newFunctionary =
				await functionaryRepository.create(functionary);
			return newFunctionary;
		} catch (error) {
			throw error;
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
			if (!functionary) {
				throw new NotFoundError("Functionary", functionaryId);
			}

			return functionary;
		} catch (error) {
			throw error;
		}
	},

	updateFunctionary: async (functionaryId, updatedFields) => {
		try {
			const personUpdated = await personRepository.update(
				functionaryId,
				updatedFields,
			);
			const functionaryUpdated = await functionaryRepository.update(
				functionaryId,
				updatedFields,
			);
			if (!functionaryUpdated && !personUpdated) {
				throw new NotFoundError("Functionary", functionaryId);
			}

			return true;
		} catch (error) {
			throw error;
		}
	},

	deleteFunctionary: async (functionaryId) => {
		try {
			const functionaryDeleted =
				await functionaryRepository.delete(functionaryId);
			if (!functionaryDeleted) {
				throw new NotFoundError("Functionary", functionaryId);
			}

			return functionaryDeleted;
		} catch (error) {
			throw error;
		}
	},

	addSubject: async (functionaryId, subjectId) => {
		try {
			const person = await functionaryRepository.getById(functionaryId);
			const functionary = await person.getFunctionary();
			if (!functionary) {
				throw new NotFoundError("Functionary", functionaryId);
			} else if (await functionary.hasSubjects(subjectId)) {
				return { message: "The functionary already has the subject" };
			}

			return functionaryRepository.addSubjects(functionaryId, subjectId);
		} catch (error) {
			throw error;
		}
	},

	deleteSubject: async (functionaryId, subjectId) => {
		try {
			const person = await functionaryRepository.getById(functionaryId);
			const functionary = await person.getFunctionary();
			if (!functionary) {
				throw new NotFoundError("Functionary", functionaryId);
			}

			return functionaryRepository.deleteSubjects(
				functionaryId,
				subjectId,
			);
		} catch (error) {
			throw error;
		}
	},
};

export default functionaryService;
