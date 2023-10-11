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
            res.clearCookie("jwt", { httpOnly: true, sameSite: "None"/* , secure: true */});
            return res.status(204).json({ msg: "No content" });
		}

		//minuto 4h 56m 21s del video de node 7h
        /* await usuarioRepository.actualizar(usuarioExiste.id, {refreshToken: null}); */
        usuarioExiste.refreshToken = null;
        const result = await usuarioExiste.save();

        res.clearCookie("jwt", { httpOnly: true, sameSite: "None"/* , secure: true */});
        res.status(204).json({ msg: "Logout exitoso" });

	},
};

export default logoutController;
