import { PreRegistration } from "../models/index.js";

const preRegistrationRepository = {
	create: async (preRegistration) => {
		try {
			const newPreRegistration =
				await PreRegistration.create(preRegistration);
			return newPreRegistration;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const preRegistrations = await PreRegistration.findAll();
			return preRegistrations;
		} catch (error) {
			throw error;
		}
	},

	getById: async (preRegistrationId) => {
		try {
			const preRegistration =
				await PreRegistration.findByPk(preRegistrationId);
			return preRegistration;
		} catch (error) {
			throw error;
		}
	},

	update: async (preRegistrationId, updatedFields) => {
		try {
			const preRegistrationUpdated = await PreRegistration.update(
				updatedFields,
				{
					where: { preRegistrationId },
				},
			);
			return preRegistrationUpdated[0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (preRegistrationId) => {
		try {
			const preRegistrationDeleted = await PreRegistration.destroy({
				where: { preRegistrationId },
			});
			return preRegistrationDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default preRegistrationRepository;