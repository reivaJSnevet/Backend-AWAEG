import { verifySignature } from "../helpers/tokens/jwt.js";

const verifyJWT = async (req, res, next) => {
	try {
		const authHeader =
			req.headers.authorization || req.headers.Authorization;

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

        const decoded = await verifySignature(token, process.env.JWT_SECRET);

        if(!decoded) {
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

		/* jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
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
	}); */
	} catch (error) {
		if (error.name === "InvalidToken") {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Access denied. Please provide valid credentials.",
                details:
                    "Invalid or missing authentication token in the 'Authorization' header. Please provide a valid jwt token code after 'Bearer'.",
            });
        } else {
            return res.status(500).json({
                error: error.name,
                message: error.message,
            });
        }
	}
};

export default verifyJWT;
