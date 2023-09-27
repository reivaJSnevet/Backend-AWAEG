import authService from "../services/authServices.js";
import jwt from "jsonwebtoken";

const authController = {
	// Login de usuario
	login: async (req, res) => {
		const { correo, contraseña } = req.body;

		try {
			const usuario = await authService.login(correo, contraseña);

			const token = jwt.sign(
				{
					id: usuario.id,
					rol: usuario.role.nombre,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: 86400, // 24 hours
				},
			);

			res.cookie("token", token, { httpOnly: true, secure: true });
			res.status(200).json({ usuario, token });
		} catch (error) {
			res.status(500).json({ error: "Error al iniciar sesión" });
			console.log(error);
		}
	},

	register: async (req, res) => {
		const { nombre, correo, contraseña, roleId } = req.body;
		const datos = { nombre, correo, contraseña, roleId };

		try {
			const nuevoUsuario = await authService.register(datos);
			res.status(201).json(nuevoUsuario);
		} catch (error) {
			res.status(500).json({ error: "Error al crear el usuario" });
			console.log(error);
		}
	},

	// verify email
	verifyEmail: async (req, res) => {
		const { token } = req.params;

		try {
			const usuario = await authService.verifyEmail(token);
			res.status(200).json(usuario);
		} catch (error) {
			res.status(500).json({ error: "Error al verificar el usuario" });
			console.log(error);
		}
	},

	// forgot password
	forgotPassword: async (req, res) => {
		const { correo } = req.body;

		try {
			const usuario = await authService.forgotPassword(correo);
			res.status(200).json(usuario);
		} catch (error) {
			res.status(500).json({ error: "Error al enviar el correo" });
			console.log(error);
		}
	},

	// reset password
	resetPassword: async (req, res) => {
		const { token } = req.params;
		const { contraseña } = req.body;

		try {
			const usuario = await authService.resetPassword(token, contraseña);
			res.status(200).json(usuario);
		} catch (error) {
			res.status(500).json({ error: "Error al cambiar la contraseña" });
			console.log(error);
		}
	},
};

export default authController;
