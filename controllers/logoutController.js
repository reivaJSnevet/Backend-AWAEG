import usuarioRepository from "../repositories/usuarioRepository.js";
import authService from "../services/authServices.js";

const logoutController = {
	logout: async (req, res) => {
		const cookies = req.cookies;

		if (!cookies?.jwt) {
			return res.status(204).json({
				msg: "No content",
			});
		}
		const refreshToken = cookies.jwt;

		const usuarioExiste = await authService.obtenerUsPorReToken(refreshToken);
		if (!usuarioExiste) {

            res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true});
            return res.status(403).json({ error: "Forbidden" });
		}

		//minuto 4h 56m 21s del video de node 7h

        await usuarioRepository.actualizar(usuarioExiste.id, {refreshToken: null});

        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true});
        res.status(204).json({ msg: "Logout exitoso" });

	},
};

export default logoutController;
