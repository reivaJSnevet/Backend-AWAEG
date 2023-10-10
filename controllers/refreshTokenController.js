import jwt from "jsonwebtoken";
import authService from "../services/authServices.js";

const refreshTokenController = {
	handleRefreshToken: async (req, res) => {
		//si falla o da datos vacios ocupa en async
		const cookies = req.cookies;

		if (!cookies?.jwt) {
			res.status(401).json({
				error: "401: unauthorized",
			});
			return;
		}
		const refreshToken = cookies.jwt;

		const usuarioExiste = await authService.obtenerUsPorReToken(refreshToken);
		if (!usuarioExiste) {
			res.status(403).json({ error: "Forbidden" });
			return;
		}

		jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET,
			(err, decoded) => {
				if (err || usuarioExiste.nombre !== decoded.nombre) {
					return res.status(403).json({ error: "Forbidden" });
				}

                const accessToken = jwt.sign(
                    { "nombre": decoded.nombre, "rol": decoded.rol },
                    process.env.JWT_SECRET,
                    { expiresIn: "30s" }
                );
                res.json({ accessToken });
			},
		);
	},
};

export default refreshTokenController;
