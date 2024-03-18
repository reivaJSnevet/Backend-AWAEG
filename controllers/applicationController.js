import applicationService from "../services/applicationService.js";

const applicationController = {
	getAll: async (req, res, next) => {
		try {
			const applications = await applicationService.getAll();
			res.status(200).json(applications);
		} catch (error) {
			next(error);
		}
	},
	getById: async (req, res, next) => {
		try {
			const application = await applicationService.getById(
				req.params.applicationId,
			);
			res.status(200).json(application);
		} catch (error) {
			next(error);
		}
	},
	getByType: async (req, res, next) => {
		try {
			const applications = await applicationService.getByType(
				req.params.type,
			);
			res.status(200).json(applications);
		} catch (error) {
			next(error);
		}
	},
    update: async (req, res, next) => {
        try {
            const application = await applicationService.update(
                req.params.applicationId,
                req.body,
            );
            res.status(200).json(application);
        } catch (error) {
            next(error);
        }
    },
};

export default applicationController;
