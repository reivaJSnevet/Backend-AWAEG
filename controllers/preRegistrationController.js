import preRegistrationService from "../services/preRegistrationService.js";

const preRegistrationController = {
	postPreRegistration: async (req, res) => {
		try {
			const newPreRegistration =
				await preRegistrationService.createPreRegistration(req.body);
			res.status(201).json(newPreRegistration);
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "Error creating preRegistration",
					message: error.message,
				});
			}
		}
	},

	getAllPreRegistrations: async (req, res) => {
		try {
			const preRegistrations =
				await preRegistrationService.getAllPreRegistrations();
			res.status(200).json(preRegistrations);
		} catch (error) {
			res.status(400).json({
				error: "Error retrieving preRegistrations",
				message: error.message,
			});
		}
	},

	getPreRegistrationById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res
					.status(400)
					.json({
						error: "Missing preRegistration ID",
						message:
							"You must specify a preRegistration ID to retrieve it",
					});
			}

			const preRegistration =
				await preRegistrationService.getPreRegistrationById(
					req.params.id,
				);

			if (preRegistration) {
				res.status(200).json(preRegistration);
			} else {
				res.status(404).json({
					error: `PreRegistration not found`,
					message: `No preRegistration found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			res.status(400).json({
				error: "Error retrieving preRegistration",
				message: error.message,
			});
		}
	},

	putPreRegistration: async (req, res) => {
		try {
			if (!req.params.id) {
				return res
					.status(400)
					.json({
						error: "Missing preRegistration ID",
						message:
							"You must specify a preRegistration ID to retrieve it",
					});
			}

			const preRegistrationUpdated =
				await preRegistrationService.updatePreRegistration(
					req.params.id,
					req.body,
				);
			if (preRegistrationUpdated) {
				res.status(200).json({
					message: `preRegistration '${req.params.id}' updated`,
				});
			} else {
				res.status(404).json({
					error: `PreRegistration not found`,
					message: `No preRegistration found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "Error updating preRegistration",
					message: error.message,
				});
			}
		}
	},

	deletePreRegistration: async (req, res) => {
		try {
			if (!req.params.id) {
				return res
					.status(400)
					.json({
						error: "Missing preRegistration ID",
						message:
							"You must specify a preRegistration ID to retrieve it",
					});
			}

			const preRegistrationDeleted =
				await preRegistrationService.deletePreRegistration(
					req.params.id,
				);
			if (preRegistrationDeleted) {
				res.status(200).json({
					message: `PreRegistration '${req.params.id}' deleted successfully`,
				});
			} else {
				res.status(404).json({
					error: `PreRegistration not found`,
					message: `No preRegistration found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			res.status(400).json({
				error: "Error deleting preRegistration",
				message: error.message,
			});
		}
	},
};

export default preRegistrationController;
