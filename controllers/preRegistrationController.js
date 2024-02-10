import preRegistrationService from "../services/preRegistrationService.js";

const preRegistrationController = {
	postPreRegistration: async (req, res, next) => {
		try {
			const newPreRegistration =
				await preRegistrationService.createPreRegistration(req.body);
			res.status(201).json(newPreRegistration);
		} catch (error) {
			next(error);
		}
	},
	getAllPreRegistrations: async (req, res, next) => {
		try {
			const preRegistrations =
				await preRegistrationService.getAllPreRegistrations();
			res.status(200).json(preRegistrations);
		} catch (error) {
			next(error);
		}
	},
	getPreRegistrationById: async (req, res, next) => {
		try {
			const preRegistration =
				await preRegistrationService.getPreRegistrationById(
					req.params.id,
				);
			res.status(200).json(preRegistration);
		} catch (error) {
			next(error);
		}
	},
	putPreRegistration: async (req, res, next) => {
		try {
			const preRegistration =
				await preRegistrationService.updatePreRegistration(
					req.params.id,
					req.body,
				);
			res.status(200).json(preRegistration);
		} catch (error) {
			next(error);
		}
	},
	deletePreRegistration: async (req, res, next) => {
		try {
			const preRegistration =
				await preRegistrationService.deletePreRegistration(
					req.params.id,
				);
			res.status(200).json(preRegistration);
		} catch (error) {
			next(error);
		}
	},
};

export default preRegistrationController;
