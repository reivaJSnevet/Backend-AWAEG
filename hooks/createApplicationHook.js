import { Application } from "../models/index.js";

export const createApplication = async (instance) => {
	try {
		const newApplication = {
			type: instance.constructor.name,
		};
		const application = await Application.create(newApplication);
		instance.applicationId = application.applicationId;
	} catch (error) {
		throw error;
	}
};
