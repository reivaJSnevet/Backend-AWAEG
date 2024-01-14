import { Application } from "../models/index.js";

/**
 * Creates a new application for the given instance.
 * @param {Object} instance - The instance for which the application is being created.
 * @returns {Promise<void>} - A promise that resolves when the application is created.
 * @throws {Error} - If there is an error creating the application.
 */
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
