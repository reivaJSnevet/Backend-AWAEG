import flawRepository from "../repositories/flawRepository.js";
import { NotFoundError } from "../errors/index.js";

const flawService = {
	createFlaw: async (flaw) => {
		try {
			const newFlaw = await flawRepository.create(flaw);
			return newFlaw;
		} catch (error) {
            throw error;
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
            if (!flaw) {
                throw new NotFoundError("Flaw", flawId);
            }

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
            if (!flawUpdated) {
                throw new NotFoundError("Flaw", flawId);
            }

			return flawUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteFlaw: async (flawId) => {
		try {
			const flawDeleted = await flawRepository.delete(flawId);
            if (!flawDeleted) {
                throw new NotFoundError("Flaw", flawId);
            }

			return flawDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default flawService;
