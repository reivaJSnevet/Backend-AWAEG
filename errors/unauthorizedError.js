import CustomError from "./customError.js";

class UnauthorizedError extends CustomError {
	constructor(message, where) {
		super(message, 401);
		this.name = "UnauthorizedError";
		this.where = where;
        
	}
}

export default UnauthorizedError;
