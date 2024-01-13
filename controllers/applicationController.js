import applicationService from "../services/applicationService.js";

const applicationController = {
	getAll: async (req, res) => {
		try {
			const applications = await applicationService.getAll();
			res.status(200).json(applications);
		} catch (error) {
			throw error;
		}
	},

	getById: async (req, res) => {
		try {
			const application = await applicationService.getById(
				req.params.applicationId,
			);

            if (!application) {
                res.status(404).json({ message: `application ${req.params.applicationId} not found` });
            }

			res.status(200).json(application);
		} catch (error) {
			throw error;
		}
	},

	getByType: async (req, res) => {
		try {
			const applications = await applicationService.getByType(
				req.params.type,
			);
			res.status(200).json(applications);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default applicationController;
