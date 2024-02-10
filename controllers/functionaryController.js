import functionaryService from "../services/functionaryService.js";

const functionaryController = {
	postFunctionary: async (req, res, next) => {
		try {
			const newFunctionary = await functionaryService.createFunctionary(
				req.body,
			);
			res.status(201).json(newFunctionary);
		} catch (error) {
			next(error);
		}
	},
	getAllFunctionaries: async (req, res, next) => {
		try {
			const functionaries =
				await functionaryService.getAllFunctionaries();
			res.status(200).json(functionaries);
		} catch (error) {
			next(error);
		}
	},
	getFunctionaryById: async (req, res, next) => {
		try {
			const functionary = await functionaryService.getFunctionaryById(
				req.params.id,
			);
			res.status(200).json(functionary);
		} catch (error) {
			next(error);
		}
	},
	putFunctionary: async (req, res, next) => {
		try {
			const functionary = await functionaryService.updateFunctionary(
				req.params.id,
				req.body,
			);
			res.status(200).json(functionary);
		} catch (error) {
			next(error);
		}
	},
	deleteFunctionary: async (req, res, next) => {
		try {
			const functionary = await functionaryService.deleteFunctionary(
				req.params.id,
			);
			res.status(200).json(functionary);
		} catch (error) {
			next(error);
		}
	},
	addSubject: async (req, res, next) => {
		try {
			const functionary = await functionaryService.addSubject(
				req.params.id,
				req.body.subjectId,
			);
			res.status(200).json(functionary);
		} catch (error) {
			next(error);
		}
	},
	deleteSubject: async (req, res, next) => {
		try {
			const functionary = await functionaryService.deleteSubject(
				req.params.id,
				req.body.subjectId,
			);
			res.status(200).json(functionary);
		} catch (error) {
			next(error);
		}
	},
};

export default functionaryController;
