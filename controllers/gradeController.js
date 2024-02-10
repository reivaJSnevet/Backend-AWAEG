import gradeService from "../services/gradeService.js";

const gradeController = {
	postGrade: async (req, res, next) => {
		try {
			const grade = await gradeService.createGrade(req.body);
			res.status(201).json(grade);
		} catch (error) {
			next(error);
		}
	},
	getAllGrades: async (req, res, next) => {
		try {
			const grades = await gradeService.getAllGrades();
			res.status(200).json(grades);
		} catch (error) {
			next(error);
		}
	},
	getGradeById: async (req, res, next) => {
		try {
			const grade = await gradeService.getGradeById(req.params.id);
			res.status(200).json(grade);
		} catch (error) {
			next(error);
		}
	},
	putGrade: async (req, res, next) => {
		try {
			const grade = await gradeService.updateGrade(
				req.params.id,
				req.body,
			);
			res.status(200).json(grade);
		} catch (error) {
			next(error);
		}
	},
	deleteGrade: async (req, res, next) => {
		try {
			const grade = await gradeService.deleteGrade(req.params.id);
			res.status(200).json(grade);
		} catch (error) {
			next(error);
		}
	},
};

export default gradeController;
