import CustomError from "./customError.js";

class ForbiddenError extends CustomError {
	constructor(where, invalidToken) {
        const message = `Forbidden access to ${process.env.NODE_ENV === "development" ? where : "🚫"}`;
		super(message, 403);
		this.name = "ForbiddenError";
        this.invalidToken = process.env.NODE_ENV === "development" ? invalidToken : "🎫"
        this.where = process.env.NODE_ENV === "development" ? where : "🗺️";
	}
}

export default ForbiddenError;
