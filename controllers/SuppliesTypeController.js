import suppliesTypeService from "../services/suppliesTypeService.js";

const suppliesTypeController = {
	postSuppliesType: async (req, res, next) => {
		try {
			const newSuppliesType = await suppliesTypeService.createSuppliesType(req.body);
			res.status(201).json(newSuppliesType);
		} catch (error) {
			next(error);
		}
	},
	getAllSuppliesType: async (req, res, next) => {
		try {
			const suppliesTypes = await suppliesTypeService.getAllSuppliesType();
			res.status(200).json(suppliesTypes);
		} catch (error) {
			next(error);
		}
	},
	getSuppliesTypeById: async (req, res, next) => {
		try {
			const suppliesType = await suppliesTypeService.getSuppliesTypeById(req.params.id);
			res.status(200).json(suppliesType);
		} catch (error) {
			next(error);
		}
	},
	putSuppliesType: async (req, res, next) => {
		try {
			const suppliesType = await suppliesTypeService.updateSuppliesType(req.params.id, req.body);
			res.status(200).json(suppliesType);
		} catch (error) {
			next(error);
		}
	},
	deleteSuppliesType: async (req, res, next) => {
		try {
			const suppliesType = await suppliesTypeService.deleteSuppliesType(req.params.id);
			res.status(200).json(suppliesType);
		} catch (error) {
			next(error);
		}
	},
};

export default suppliesTypeController;
