import gradeService from "../services/gradeService.js";

const gradeController = {
	postGrade: async (req, res) => {
		try {
			const grade = await gradeService.createGrade(req.body);
			res.status(201).json(grade);
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "Error creating grade",
					message: error.message,
				});
			}
		}
	},
	getAllGrades: async (req, res) => {
		try {
			const grades = await gradeService.getAllGrades();
			res.status(200).json(grades);
		} catch (error) {
			res.status(500).json({
				error: "Error getting grades",
				message: error.message,
			});
		}
	},
	getGradeById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing grade ID",
					message: "You must specify a grade ID to retrieve it",
				});
			}

			const grade = await gradeService.getGradeById(req.params.id);
			res.status(200).json(grade);

			if (grade) {
				return res.status(200).json(grade);
			} else {
				return res.status(404).json({
					error: `Grade not found`,
					message: `No grade found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			res.status(500).json({
				error: "Error getting grade",
				message: error.message,
			});
		}
	},
	putGrade: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing grade ID",
					message: "You must specify a grade ID to update it",
				});
			}

			const gradeUpdated = await gradeService.updateGrade(
				req.params.id,
				req.body,
			);
			res.status(200).json(gradeUpdated);

			if (gradeUpdated) {
				return res
					.status(200)
					.json({
						message: `grade '${req.params.id}' updated`,
					});
			} else {
				return res.status(404).json({
					error: `Grade not found`,
					message: `No grade found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "Error updating grade",
					message: error.message,
				});
			}
		}
	},
	deleteGrade: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing grade ID",
					message: "You must specify a grade ID to delete it",
				});
			}

			const gradeDeleted = await gradeService.deleteGrade(req.params.id);
			res.status(200).json(gradeDeleted);

			if (gradeDeleted) {
				return res
					.status(200)
					.json({
						message: `Grade with ID '${req.params.id}' deleted`,
					});
			} else {
				return res.status(404).json({
					error: `Grade not found`,
					message: `No grade found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			res.status(500).json({
				error: "Error deleting grade",
				message: error.message,
			});
		}
	},
};

export default gradeController;
