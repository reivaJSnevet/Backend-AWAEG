import { Functionary, User, Subject, Group} from "../models/index.js";

const functionaryRepository = {
	create: async (functionary) => {
		try {
			const newFunctionary = await Functionary.create(functionary);
			return newFunctionary;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const functionaries = await Functionary.findAll({
				include: [
					{
						model: User,
                        attributes: ["userName", "email"],
					},
					{
						model: Subject,
					},
                    {
                        model: Group,
                    }
				],
			});
			return functionaries;
		} catch (error) {
			throw error;
		}
	},

	getById: async (functionaryId) => {
		try {
			const functionary = await Functionary.findByPk(functionaryId, {
				include: [
					{
						model: User,
					},
					{
						model: Subject,
					},
				],
			});
			return functionary;
		} catch (error) {
            console.log("EL ERROR ESTÁ AQUÍ EN FUNCTIONARY REPOSITORY");
			throw error;
		}
	},

	update: async (functionaryId, updatedFields) => {
		try {
			const functionaryUpdated = await Functionary.update(updatedFields, {
				where: { functionaryId },
			});
			return functionaryUpdated[0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (functionaryId) => {
		try {
			const functionaryDeleted = await Functionary.destroy({
				where: { functionaryId },
			});
			return functionaryDeleted;
		} catch (error) {
			throw error;
		}
	},

	addSubject: async (functionaryId, subjectId) => {
		try {
			const functionary = await Functionary.findByPk(functionaryId);
			await functionary.addSubject(subjectId);
			return functionary;
		} catch (error) {
			throw error;
		}
	},

	addSubjects: async (functionaryId, subjectsIds) => {
		try {
			const functionary = await Functionary.findByPk(functionaryId);
			await functionary.addSubjects(subjectsIds);
			return functionary;
		} catch (error) {
			throw error;
		}
	},

	deleteSubject: async (functionaryId, subjectId) => {
		try {
			const functionary = await Functionary.findByPk(functionaryId);
			await functionary.removeSubject(subjectId);
			return functionary;
		} catch (error) {
			throw error;
		}
	},

	deleteSubjects: async (functionaryId, subjectsIds) => {
		try {
			const functionary = await Functionary.findByPk(functionaryId);
			await functionary.removeSubjects(subjectsIds);
			return functionary;
		} catch (error) {
			throw error;
		}
	},
};

export default functionaryRepository;
