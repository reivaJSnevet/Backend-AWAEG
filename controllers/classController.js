import classService from "../services/classService.js";

const classController = {
	postClass: async (req, res, next) => {
		try {
			const newClass = await classService.createClass(req.body);
			res.status(201).send(newClass);
		} catch (error) {
			next(error);
		}
	},
	getAllClasses: async (req, res, next) => {
		try {
			const classes = await classService.getAllClasses();
			res.status(200).json(classes);
		} catch (error) {
			next(error);
		}
	},
	getClassesBySection: async (req, res, next) => {
		try {
			const classData = await classService.getClassesBySection(req.params.id);
			res.status(200).json(classData);
		} catch (error) {
			next(error);
		}
	},
	putClass: async (req, res, next) => {
		try {
			const classData = await classService.updateClass(req.params.id, req.body);
			res.status(200).json(classData);
		} catch (error) {
			next(error);
		}
	},
	deleteClass: async (req, res, next) => {
		try {
			const classData = await classService.deleteClass(req.params.id);
			res.status(200).json(classData);
		} catch (error) {
			next(error);
		}
	},
};

export default classController;
