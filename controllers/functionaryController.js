import functionaryService from "../services/functionaryService.js";

const functionaryController = {
	postFunctionary: async (req, res) => {
		try {
			const newFunctionary = await functionaryService.createFunctionary(
				req.body,
			);
			res.status(201).json(newFunctionary);
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "Error creating functionary",
					message: error.message,
				});
			}
		}
	},

	getAllFunctionaries: async (req, res) => {
		try {
			const functionaries =
				await functionaryService.getAllFunctionaries();
			res.status(200).json(functionaries);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving functionaries",
				message: error.message,
			});
		}
	},

	getFunctionaryById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing functionary ID",
					message: "You must specify a functionary ID to retrieve it",
				});
			}

			const functionary = await functionaryService.getFunctionaryById(
				req.params.id,
			);

			if (functionary) {
				return res.status(200).json(functionary);
			} else {
				return res.status(404).json({
					error: `Functionary not found`,
					message: `No functionary found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving functionary",
				message: error.message,
			});
		}
	},

	putFunctionary: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing functionary ID",
					message: "You must specify a functionary ID to update it",
				});
			}

			const updatedFunctionary =
				await functionaryService.updateFunctionary(
					req.params.id,
					req.body,
				);

			if (updatedFunctionary) {
				return res.status(200).json({
					message: `functionary '${req.params.id}' updated`,
				});
			} else {
				return res.status(404).json({
					error: `Functionary not found`,
					message: `No functionary found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "Error updating functionary",
					message: error.message,
				});
			}
		}
	},

	deleteFunctionary: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing functionary ID",
					message: "You must specify a functionary ID to delete it",
				});
			}

			const functionaryDeleted =
				await functionaryService.deleteFunctionary(req.params.id);

			if (functionaryDeleted) {
				return res.status(200).json({
					message: `Functionary '${req.params.id}' deleted successfully`,
				});
			} else {
				return res.status(404).json({
					error: `Functionary not found`,
					message: `No functionary found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error deleting functionary",
				message: error.message,
			});
		}
	},

	addSubject: async (req, res) => {
		try {
			if (!req.params.id || !req.body.subjectId) {
				return res.status(400).json({
					error: "Missing functionary ID or subject ID",
					message:
						"You must specify a functionary and subject ID to add a subject",
				});
			}
			const functionary = await functionaryService.addSubject(
				req.params.id,
				req.body.subjectId,
			);

			if (functionary) {
				return res.status(200).json(functionary);
			} else {
				return res.status(404).json({
					error: `Functionary or subject not found`,
					message: `No functionary found with ID '${req.params.id}' or no subject found with ID '${req.body.subjectId}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error adding subject to functionary",
				message: error.message,
			});
		}
	},

	deleteSubject: async (req, res) => {
		try {
			if (!req.params.id || !req.body.subjectId) {
				return res.status(400).json({
					error: "Missing functionary ID or subject ID",
					message:
						"You must specify a functionary and subject ID to delete a subject",
				});
			}

			const functionary = await functionaryService.deleteSubject(
				req.params.id,
				req.body.subjectId,
			);

			if (functionary) {
				return res.status(200).json(functionary);
			} else {
				return res.status(404).json({
					error: `Functionary and subject not associated`,
					message: `No functionary associated with ID '${req.params.id}' to subject with ID '${req.body.subjectId}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error deleting subject from functionary",
				message: error.message,
			});
		}
	},
};

export default functionaryController;
