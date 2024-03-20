import electronicSuppliesService from "../services/electronicSuppliesService.js";

const ElectronicSuppliesController
 = {
	postElectronicSupplies: async (req, res, next) => {
		try {
			const newElectronicSupplies = await electronicSuppliesService.createElectronicSupplies(req.body);
			res.status(201).json(newElectronicSupplies);
		} catch (error) {
			next(error);
		}
	},
	getAllElectronicSupplies: async (req, res, next) => {
		try {
			const electronicSupplies = await electronicSuppliesService.getAllElectronicSupplies();
			res.status(200).json(electronicSupplies);
		} catch (error) {
			next(error);
		}
	},
	getElectronicSuppliesById: async (req, res, next) => {
		try {
			const electronicSupplies = await electronicSuppliesService.getElectronicSuppliesById(req.params.id);
			res.status(200).json(electronicSupplies);
		} catch (error) {
			next(error);
		}
	},
	putElectronicSupplies: async (req, res, next) => {
		try {
			const electronicSupplies = await electronicSuppliesService.updateElectronicSupplies(req.params.id, req.body);
			res.status(200).json(electronicSupplies);
		} catch (error) {
			next(error);
		}
	},
	deleteElectronicSupplies: async (req, res, next) => {
		try {
			const electronicSupplies = await electronicSuppliesService.deleteElectronicSupplies(req.params.id);
			res.status(200).json(electronicSupplies);
		} catch (error) {
			next(error);
		}
	},
};

export default ElectronicSuppliesController
;
