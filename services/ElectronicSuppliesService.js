import electronicSuppliesRepository from "../repositories/ElectronicSuppliesRepository.js";
import { NotFoundError } from "../errors/index.js";

const electronicSuppliesService = {
	createElectronicSupplies: async (electronicSupplies) => {
		try {
			const newElectronicSupplies = await electronicSuppliesRepository.create(electronicSupplies);
			return newElectronicSupplies;
		} catch (error) {
			throw error;
		}
	},

	getAllElectronicSupplies: async () => {
		try {
			const electronicSupplies = await electronicSuppliesRepository.getAll();
			return electronicSupplies;
		} catch (error) {
			throw error;
		}
	},

	getElectronicSuppliesById: async (electronicSuppliesId) => {
		try {
			const electronicSupplies = await electronicSuppliesRepository.getById(electronicSuppliesId);
			if (!electronicSupplies) {
				throw new NotFoundError("ElectronicSupplies", electronicSuppliesId);
			}

			return electronicSupplies;
		} catch (error) {
			throw error;
		}
	},

	updateElectronicSupplies: async (electronicSuppliesId, updatedFields) => {
		try {
			const electronicSuppliesUpdated = await electronicSuppliesRepository.update(
				electronicSuppliesId,
				updatedFields,
			);
			if (!electronicSuppliesUpdated) {
				throw new NotFoundError("ElectronicSupplies", electronicSuppliesId);
			}

			return electronicSuppliesUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteElectronicSupplies: async (electronicSuppliesId) => {
		try {
			const electronicSuppliesDeleted = await electronicSuppliesRepository.delete(electronicSuppliesId);
			if (!electronicSuppliesDeleted) {
				throw new NotFoundError("ElectronicSupplies", electronicSuppliesId);
			}

			return electronicSuppliesDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default electronicSuppliesService;
