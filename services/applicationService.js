import applicationRepository from "../repositories/applicationRepository.js";
import { NotFoundError } from "../errors/index.js";

const applicationService = {
	getAll: async () => {
		try {
			const applications = await applicationRepository.getAll();
			return applications;
		} catch (error) {
			throw error;
		}
	},

	getById: async (applicationId) => {
		try {
			const application =
				await applicationRepository.getById(applicationId);
            if (!application) {
                throw new NotFoundError("Application", applicationId);
            }
			return application;
		} catch (error) {
			throw error;
		}
	},

	getByType: async (type) => {
		try {
			const applications = await applicationRepository.getByType(type);
			return applications;
		} catch (error) {
			throw error;
		}
	},

    update: async (applicationId, applicationData) => {
        try {
            const application =
                await applicationRepository.update(applicationId, applicationData);
            return application;
        } catch (error) {
            throw error;
        }
    },
};

export default applicationService;
