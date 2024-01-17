import flawRepository from "../repositories/flawRepository.js";

const flawService = {
	createFlaw: async (flaw) => {
		try {
			const newFlaw = await flawRepository.create(flaw);
			return newFlaw;
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

	getAllFlaws: async () => {
		try {
			const flaws = await flawRepository.getAll();
			return flaws;
		} catch (error) {
			throw error;
		}
	},

	getFlawById: async (flawId) => {
		try {
			const flaw = await flawRepository.getById(flawId);
			return flaw;
		} catch (error) {
			throw error;
		}
	},

	updateFlaw: async (flawId, updatedFields) => {
		try {
			const flawUpdated = await flawRepository.update(
				flawId,
				updatedFields,
			);
			return flawUpdated[0];
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

	deleteFlaw: async (flawId) => {
		try {
			const flawDeleted = await flawRepository.delete(flawId);
			return flawDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default flawService;
