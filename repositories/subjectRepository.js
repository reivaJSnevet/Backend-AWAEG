import { Subject } from "../models/index.js";

const subjectRepository = {
	create: async (subject) => {
		try {
			const newSubject = await Subject.create(subject);
			return newSubject;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const subjects = await Subject.findAll();
			return subjects;
		} catch (error) {
			throw error;
		}
	},

	getById: async (subjectId) => {
		try {
			const subject = await Subject.findByPk(subjectId);
			return subject;
		} catch (error) {
			throw error;
		}
	},

	update: async (subjectId, updatedFields) => {
		try {
			const subjectUpdated = await Subject.update(updatedFields, {
				where: { subjectId },
                individualHooks: true,
			});
			return subjectUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (subjectId) => {
		try {
			const subjectDeleted = await Subject.destroy({
				where: { subjectId },
			});
			return subjectDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default subjectRepository;
