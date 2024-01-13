import { Application } from "../models/index.js";

const applicationRepository = {
	getAll: async () => {
		try {
			const applications = await Application.findAll();
			return applications;
		} catch (error) {
			throw error;
		}
	},

	getById: async (applicationId) => {
		try {
			const application = await Application.findByPk(applicationId);
			return application;
		} catch (error) {
			throw error;
		}
	},

	getByType: async (type) => {
		try {
			const applications = await Application.findAll({
				where: { type },
				include: `${type}`,
			});
			return applications;
		} catch (error) {
			throw error;
		}
	},
};

export default applicationRepository;
