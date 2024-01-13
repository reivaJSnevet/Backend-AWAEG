import caregiverRepository from "../repositories/caregiverRepository.js";

const caregiverService = {
	createCaregiver: async (caregiver) => {
		try {
			const newCaregiver = await caregiverRepository.create(caregiver);
			return newCaregiver;
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

	getAllCaregivers: async () => {
		try {
			const caregivers = await caregiverRepository.getAll();
			return caregivers;
		} catch (error) {
			throw error;
		}
	},

	getCaregiverById: async (caregiverId) => {
		try {
			const caregiver = await caregiverRepository.getById(caregiverId);
			return caregiver;
		} catch (error) {
			throw error;
		}
	},

	updateCaregiver: async (caregiverId, updatedFields) => {
		try {
			const caregiverUpdated = await caregiverRepository.update(
				caregiverId,
				updatedFields,
			);
			return caregiverUpdated;
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

	deleteCaregiver: async (caregiverId) => {
		try {
			const caregiverDeleted =
				await caregiverRepository.delete(caregiverId);
			return caregiverDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default caregiverService;
