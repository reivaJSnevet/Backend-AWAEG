import flawService from "../services/flawService.js";

const flawController = {
	postFlaw: async (req, res, next) => {
		try {
			const newFlaw = await flawService.createFlaw(req.body);
			res.status(201).json(newFlaw);
		} catch (error) {
			next(error);
		}
	},
	getAllFlaws: async (req, res, next) => {
		try {
			const flaws = await flawService.getAllFlaws();
			res.status(200).json(flaws);
		} catch (error) {
			next(error);
		}
	},
	getFlawById: async (req, res, next) => {
		try {
			const flaw = await flawService.getFlawById(req.params.id);
			return res.status(200).json(flaw);
		} catch (error) {
			next(error);
		}
	},
	putFlaw: async (req, res, next) => {
		try {
			const flaw = await flawService.updateFlaw(
				req.params.id,
				req.body,
			);
			return res.status(200).json(flaw);
		} catch (error) {
			next(error);
		}
	},
	deleteFlaw: async (req, res, next) => {
		try {
			const flaw = await flawService.deleteFlaw(req.params.id);
			return res.status(200).json(flaw);
		} catch (error) {
			next(error);
		}
	},
};

export default flawController;
