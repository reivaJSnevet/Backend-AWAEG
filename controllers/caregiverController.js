import caregiverService from "../services/caregiverService.js";

const caregiverController = {
	postCaregiver: async (req, res) => {
		try {
			const newCaregiver = await caregiverService.createCaregiver(
				req.body,
			);
			res.status(201).json(newCaregiver);
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				res.status(500).json({
					error: "Error creating caregiver",
					message: error.message,
				});
			}
		}
	},
	getAllCaregivers: async (req, res) => {
		try {
			const caregivers = await caregiverService.getAllCaregivers();
			res.status(200).json(caregivers);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving caregivers",
				message: error.message,
			});
		}
	},
	getCaregiverById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing caregiver ID",
					message: "You must specify a caregiver ID to retrieve it",
				});
			}

			const caregiver = await caregiverService.getCaregiverById(
				req.params.id,
			);

			if (caregiver) {
				return res.status(200).json(caregiver);
			} else {
				return res.status(404).json({
					error: `Caregiver not found`,
					message: `No caregiver found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving caregiver",
				message: error.message,
			});
		}
	},
	putCaregiver: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing caregiver ID",
					message: "You must specify a caregiver ID to update it",
				});
			}

			const caregiverUpdated = await caregiverService.updateCaregiver(
				req.params.id,
				req.body,
			);

			if (caregiverUpdated) {
				return res.status(200).json({message: `caregiver '${req.params.id}' updated`});
			} else {
				return res.status(404).json({
					error: `Caregiver not found`,
					message: `No caregiver found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				res.status(500).json({
					error: "Error updating caregiver",
					message: error.message,
				});
			}
		}
	},
	deleteCaregiver: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing caregiver ID",
					message: "You must specify a caregiver ID to delete it",
				});
			}

			const caregiverDeleted = await caregiverService.deleteCaregiver(
				req.params.id,
			);

			if (caregiverDeleted) {
				return res.status(200).json({
					message: `Caregiver with ID '${req.params.id}' deleted`,
				});
			} else {
				return res.status(404).json({
					error: `Caregiver not found`,
					message: `No caregiver found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error deleting caregiver",
				message: error.message,
			});
		}
	},
};

export default caregiverController;
