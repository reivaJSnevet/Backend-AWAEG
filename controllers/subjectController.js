import subjectService from "../services/subjectService.js";

const subjectController = {
	postSubject: async (req, res, next) => {
		try {
			const newSubject = await subjectService.createSubject(req.body);
			res.status(201).json(newSubject);
		} catch (error) {
			next(error);
		}
	},
	getAllSubjects: async (req, res, next) => {
		try {
			const subjects = await subjectService.getAllSubjects();
			res.status(200).json(subjects);
		} catch (error) {
			next(error);
		}
	},
	getSubjectById: async (req, res, next) => {
		try {
			const subject = await subjectService.getSubjectById(
				req.params.subjectId,
			);

			res.status(200).json(subject);
		} catch (error) {
			next(error);
		}
	},
	putSubject: async (req, res, next) => {
		try {
			const subject = await subjectService.updateSubject(
				req.params.subjectId,
				req.body,
			);
			res.status(200).json(subject);
		} catch (error) {
			next(error);
		}
	},
	deleteSubject: async (req, res, next) => {
		try {
			const subject = await subjectService.deleteSubject(
				req.params.subjectId,
			);
			res.status(200).json(subject);
		} catch (error) {
			next(error);
		}
	},
};

export default subjectController;
