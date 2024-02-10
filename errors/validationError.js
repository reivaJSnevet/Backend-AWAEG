import CustomError from "./customError.js";

class ValidationError extends CustomError {
	constructor(message) {
		super(message, 400);
		this.name = "ValidationError";
	}
}

export default ValidationError;
