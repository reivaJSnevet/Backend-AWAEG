import caregiverService from "../services/caregiverService.js";

const caregiverController = {
	postCaregiver: async (req, res, next) => {
		try {
			const newCaregiver = await caregiverService.createCaregiver(
				req.body,
			);
			res.status(201).json(newCaregiver);
		} catch (error) {
			next(error);
		}
	},
	getAllCaregivers: async (req, res, next) => {
		try {
			const caregivers = await caregiverService.getAllCaregivers();
			res.status(200).json(caregivers);
		} catch (error) {
			next(error);
		}
	},
	getCaregiverById: async (req, res, next) => {
		try {
			const caregiver = await caregiverService.getCaregiverById(
				req.params.id,
			);
			res.status(200).json(caregiver);
		} catch (error) {
			next(error);
		}
	},
	putCaregiver: async (req, res, next) => {
		try {
			const caregiver = await caregiverService.updateCaregiver(req.params.id, req.body);
			res.status(200).json(caregiver);
		} catch (error) {
			next(error);
		}
	},
	deleteCaregiver: async (req, res, next) => {
		try {
			const caregiver = await caregiverService.deleteCaregiver(
				req.params.id,
			);
			res.status(200).json(caregiver);
		} catch (error) {
			next(error);
		}
	},
};

export default caregiverController;
