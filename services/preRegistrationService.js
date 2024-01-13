import preRegistrationRepository from "../repositories/preRegistrationRepository.js";

const preRegistrationService = {
	createPreRegistration: async (preRegistration) => {
		try {
			const newPreRegistration =
				await preRegistrationRepository.create(preRegistration);
			return newPreRegistration;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeValidationError") {
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
			return preRegistrationUpdated;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeValidationError") {
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

	deletePreRegistration: async (preRegistrationId) => {
		try {
			const preRegistrationDeleted =
				await preRegistrationRepository.delete(preRegistrationId);
			return preRegistrationDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default preRegistrationService;
