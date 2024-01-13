import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith("Bearer"))
		return res.status(401).json({
			error: "Unauthorized",
			message: "Access denied. Please provide valid credentials.",
			details:
				"Invalid or missing authentication token in the 'Authorization' header. Please provide a valid 'Bearer' token.",
		});

	const token = authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			error: "Unauthorized",
			message: "Access denied. Please provide valid credentials.",
			details:
				"Invalid or missing authentication token in the 'Authorization' header. Please provide a valid jwt token code after 'Bearer'.",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
		if (error) {
			return res.status(401).json({
				error: "Unauthorized",
				message: "Access denied. Please provide valid credentials.",
				details:
					"Invalid or missing authentication token in the 'Authorization' header. Please provide a valid jwt token code after 'Bearer'.",
			});
		}
		req.userName = decoded.userName;
		req.role = decoded.role;
		next();
	});
};

export default verifyJWT;
