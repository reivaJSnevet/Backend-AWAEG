import preRegistrationRepository from "../repositories/preRegistrationRepository.js";
import { NotFoundError } from "../errors/index.js";

const preRegistrationService = {
	createPreRegistration: async (preRegistration) => {
		try {
			const newPreRegistration =
				await preRegistrationRepository.create(preRegistration);
			return newPreRegistration;
		} catch (error) {
			throw error;
		}
	},

	getAllPreRegistrations: async () => {
		try {
			const preRegistrations = await preRegistrationRepository.getAll();
			return preRegistrations;
		} catch (error) {
			throw error;
		}
	},

	getPreRegistrationById: async (preRegistrationId) => {
		try {
			const preRegistration =
				await preRegistrationRepository.getById(preRegistrationId);
			if (!preRegistration) {
				throw new NotFoundError("PreRegistration", preRegistrationId);
			}

			return preRegistration;
		} catch (error) {
			throw error;
		}
	},

	updatePreRegistration: async (preRegistrationId, updatedFields) => {
		try {
			const preRegistrationUpdated =
				await preRegistrationRepository.update(
					preRegistrationId,
					updatedFields,
				);

			if (!preRegistrationUpdated) {
				throw new NotFoundError("PreRegistration", preRegistrationId);
			}

			return preRegistrationUpdated;
		} catch (error) {
			throw error;
		}
	},

	deletePreRegistration: async (preRegistrationId) => {
		try {
			const preRegistrationDeleted =
				await preRegistrationRepository.delete(preRegistrationId);
			if (!preRegistrationDeleted) {
				throw new NotFoundError("PreRegistration", preRegistrationId);
			}

			return preRegistrationDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default preRegistrationService;
