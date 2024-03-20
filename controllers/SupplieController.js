import supplieService from "../services/SuppliesService.js";

const supplieController = {
	postSupplie: async (req, res, next) => {
		try {
			const newSupplie = await supplieService.createSupplie(req.body);
			res.status(201).json(newSupplie);
		} catch (error) {
			next(error);
		}
	},
	getAllSupplies: async (req, res, next) => {
		try {
			const supplies = await supplieService.getAllSupplies();
			res.status(200).json(supplies);
		} catch (error) {
			next(error);
		}
	},
	getSupplieById: async (req, res, next) => {
		try {
			const supplie = await supplieService.getSupplieById(req.params.id);
			res.status(200).json(supplie);
		} catch (error) {
			next(error);
		}
	},
	putSupplie: async (req, res, next) => {
		try {
			const supplie = await supplieService.updateSupplie(req.params.id, req.body);
			res.status(200).json(supplie);
		} catch (error) {
			next(error);
		}
	},
	deleteSupplie: async (req, res, next) => {
		try {
			const supplie = await supplieService.deleteSupplie(req.params.id);
			res.status(200).json(supplie);
		} catch (error) {
			next(error);
		}
	},
};

export default supplieController;
