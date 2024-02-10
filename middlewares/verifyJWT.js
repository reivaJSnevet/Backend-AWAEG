import { verifySignature } from "../helpers/tokens/jwt.js";
import { UnauthorizedError } from "../errors/index.js";

const verifyJWT = async (req, res, next) => {
	try {
		const authHeader =
			req.headers.authorization || req.headers.Authorization;

		if (!authHeader?.startsWith("Bearer")) {
			throw new UnauthorizedError(
				"VerifyJWT startWithBearer",
				"Invalid or missing authentication token in the 'Authorization' header. Please provide a valid jwt token code after 'Bearer'.",
			);
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			throw new UnauthorizedError(
				"VerifyJWT noToken",
				"Invalid or missing authentication token in the 'Authorization' header. Please provide a valid jwt token code after 'Bearer'.",
			);
		}

		const decoded = await verifySignature(token, process.env.JWT_SECRET);

		if (!decoded) {
			throw new UnauthorizedError(
				"VerifyJWT decode",
				"Invalid or missing authentication token in the 'Authorization' header. Please provide a valid jwt token code after 'Bearer'.",
			);
		}

		req.userName = decoded.userName;
		req.role = decoded.role;
		next();
	} catch (error) {
		next(error);
	}
};

export default verifyJWT;
