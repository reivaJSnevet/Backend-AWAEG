import suppliesTypeRepository from "../repositories/suppliesTypeRepository.js";
import { NotFoundError } from "../errors/index.js";

const suppliesTypeService = {
	createSuppliesType: async (suppliesType) => {
		try {
			const newSuppliesType = await suppliesTypeRepository.create(suppliesType);
			return newSuppliesType;
		} catch (error) {
			throw error;
		}
	},

	getAllSuppliesType: async () => {
		try {
			const suppliesTypes = await suppliesTypeRepository.getAll();
			return suppliesTypes;
		} catch (error) {
			throw error;
		}
	},

	getSuppliesTypeById: async (suppliesTypeId) => {
		try {
			const suppliesType = await suppliesTypeRepository.getById(suppliesTypeId);
			if (!suppliesType) {
				throw new NotFoundError("SuppliesType", suppliesTypeId);
			}

			return suppliesType;
		} catch (error) {
			throw error;
		}
	},

	updateSuppliesType: async (suppliesTypeId, updatedFields) => {
		try {
			const suppliesTypeUpdated = await suppliesTypeRepository.update(
				suppliesTypeId,
				updatedFields,
			);
			if (!suppliesTypeUpdated) {
				throw new NotFoundError("SuppliesType", suppliesTypeId);
			}

			return suppliesTypeUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteSuppliesType: async (suppliesTypeId) => {
		try {
			const suppliesTypeDeleted = await suppliesTypeRepository.delete(suppliesTypeId);
			if (!suppliesTypeDeleted) {
				throw new NotFoundError("SuppliesType", suppliesTypeId);
			}

			return suppliesTypeDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default suppliesTypeService;
