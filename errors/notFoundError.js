import CustomError from "./customError.js";

class NotFoundError extends CustomError {
	constructor(resource, resourceId) {
		const message = `The ${resource} with the id ${resourceId} was not found`;
		super(message, 404);
		this.name = "NotFoundError";
		this.resourceId = resourceId;
	}
}

export default NotFoundError;
