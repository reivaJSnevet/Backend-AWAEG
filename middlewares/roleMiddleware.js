import jwt from "jsonwebtoken";

const checkRole = (role) => {
	return (req, res, next) => {
		const token = req.cookies ? req.cookies.token : null;
		const tokenP = req.headers.authorization.split(" ")[1];

		//arreglo de rutas (traae path y contralador)

		if (!token && !tokenP) {
			console.log("AQQQQIUIIIII");
			return res.status(401).json({ error: "Unauthorized" });
		}

		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err || !decodedToken) {
					return res.status(401).json({ error: "Unauthorized" });
				}

				if (decodedToken.rol !== role) {
					return res.status(403).json({ error: "Forbidden" });
				}

				next();
			});
		}

		if (tokenP) {
			jwt.verify(tokenP, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err || !decodedToken) {
					return res.status(401).json({ error: "Unauthorized" });
				}

				if (decodedToken.rol !== role) {
					return res.status(403).json({ error: "Forbidden" });
				}

				next();
			});
		}
	};
};

export default checkRole;
