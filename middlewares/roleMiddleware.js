import jwt from "jsonwebtoken";

const checkRole = (allowedRoles) => {
	return (req, res, next) => {
		const token = req.cookies ? req.cookies.token : null;
		const tokenP = req.headers.authorization.split(" ")[1];

		if (!token && !tokenP) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const verifyToken = (tokenToVerify) => {
			jwt.verify(tokenToVerify, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err || !decodedToken) {
					return res.status(401).json({ error: "Unauthorized" });
				}

				if (!allowedRoles.includes(decodedToken.rol)) {
					return res.status(403).json({ error: "Forbidden" });
				}

				next();
			});
		};

		if (token) {
			verifyToken(token);
		}

		if (tokenP) {
			verifyToken(tokenP);
		}
	};
};

export default checkRole;

