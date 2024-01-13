import classService from "../services/classService.js";

const classController = {
	postClass: async (req, res) => {
		try {
			const newClass = await classService.createClass(req.body);
			res.status(201).send(newClass);
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				res.status(500).json({
					error: "Error creating class",
					message: error.message,
				});
			}
		}
	},

	getAllClasses: async (req, res) => {
		try {
			const classes = await classService.getAllClasses();
			res.status(200).json(classes);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving classes",
				message: error.message,
			});
		}
	},

	getClassById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing class ID",
					message: "You must specify a class ID to retrieve it",
				});
			}

			const classData = await classService.getClassById(req.params.id);

			if (classData) {
				return res.status(200).json(classData);
			} else {
				return res.status(404).json({
					error: `Class not found`,
					message: `No class found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving class",
				message: error.message,
			});
		}
	},

	putClass: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing class ID",
					message: "You must specify a class ID to update it",
				});
			}

			const classData = await classService.updateClass(
				req.params.id,
				req.body,
			);

			if (classData) {
				return res
					.status(200)
					.json({ message: `class '${req.params.id}' updated` });
			} else {
				return res.status(404).json({
					error: `Class not found`,
					message: `No class found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				res.status(500).json({
					error: "Error updating class",
					message: error.message,
				});
			}
		}
	},

	deleteClass: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing class ID",
					message: "You must specify a class ID to delete it",
				});
			}

			const classData = await classService.deleteClass(req.params.id);

			if (classData) {
				return res
					.status(200)
					.json({ message: "Class deleted successfully" });
			} else {
				return res.status(404).json({
					error: `Class not found`,
					message: `No class found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error deleting class",
				message: error.message,
			});
		}
	},

	addDay: async (req, res) => {
		try {
			if (!req.params.id || !req.body.daysId) {
				return res.status(400).json({
					error: "Missing class ID or day ID",
					message: "You must specify a class ID and day ID to add it",
				});
			}

			const classDay = await classService.addDay(
				req.params.id,
				req.body.daysId,
			);

			if (classDay) {
				return res.status(200).json(classDay);
			} else {
				return res.status(404).json({
					error: `Class or day not found`,
					message: `No class found with ID '${req.params.id}' or day with ID '${req.body.daysId}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error adding day",
				message: error.message,
			});
		}
	},

	deleteDay: async (req, res) => {
		try {
			if (!req.params.id || !req.body.daysId) {
				return res.status(400).json({
					error: "Missing class ID or day ID",
					message:
						"You must specify a class ID and day ID to delete it",
				});
			}

			const classDay = await classService.deleteDay(
				req.params.id,
				req.body.daysId,
			);

			if (classDay) {
				return res.status(200).json(classDay);
			} else {
				return res.status(404).json({
					error: `Class or day not found`,
					message: `No class found with ID '${req.params.id}' or day with ID '${req.body.daysId}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error deleting day",
				message: error.message,
			});
		}
	},
};

export default classController;
