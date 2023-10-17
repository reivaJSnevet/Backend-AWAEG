import jwt from "jsonwebtoken";
import authService from "../services/authServices.js";
import estudianteRepository from "../repositories/estudianteRepository.js";
import funcionarioRepository from "../repositories/funcionarioRepository.js";

const refreshTokenController = {
	handleRefreshToken: async (req, res) => {
        try {
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

		/* console.log(usuarioExiste); */
		if (!usuarioExiste) {
			res.status(403).json({ error: "Forbidden no user" });
			return;
		}

        let personaId = 0;
        if(usuarioExiste.role.nombre === "Estudiante"){
            personaId = await estudianteRepository.estudianteByUsuarioId(usuarioExiste.id);
        }else{
            personaId = await funcionarioRepository.funcionarioByUsuarioId(usuarioExiste.id);
        }

		jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET,
			(err, decoded) => {
				if (err || usuarioExiste.nombre !== decoded.nombre) {
					return res.status(403).json({ error: "Forbidden" });
				}

				const accessToken = jwt.sign(
					{ nombre: decoded.nombre, rol: usuarioExiste.role.nombre },
					process.env.JWT_SECRET,
					{ expiresIn: "10s" },
				);
				res.json({ rol:usuarioExiste.role.nombre ,accessToken, personaId: personaId.id });
			},
		);
        }catch (error) {
            console.log(error);
        }
	},
};

export default refreshTokenController;
