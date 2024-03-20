import supplieRepository from "../repositories/supplieRepository.js";
import { NotFoundError } from "../errors/index.js";

const supplieService = {
	createSupplie: async (supplie) => {
		try {
			const newSupplie = await supplieRepository.create(supplie);
			return newSupplie;
		} catch (error) {
			throw error;
		}
	},

	getAllSupplies: async () => {
		try {
			const supplies = await supplieRepository.getAll();
			return supplies;
		} catch (error) {
			throw error;
		}
	},

	getSupplieById: async (supplieId) => {
		try {
			const supplie = await supplieRepository.getById(supplieId);
			if (!supplie) {
				throw new NotFoundError("Supplie", supplieId);
			}

			return supplie;
		} catch (error) {
			throw error;
		}
	},

	updateSupplie: async (supplieId, updatedFields) => {
		try {
			const supplieUpdated = await supplieRepository.update(
				supplieId,
				updatedFields,
			);
			if (!supplieUpdated) {
				throw new NotFoundError("Supplie", supplieId);
			}

			return supplieUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteSupplie: async (supplieId) => {
		try {
			const supplieDeleted = await supplieRepository.delete(supplieId);
			if (!supplieDeleted) {
				throw new NotFoundError("Supplie", supplieId);
			}

			return supplieDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default supplieService;
