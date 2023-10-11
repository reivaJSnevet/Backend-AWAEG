import authService from "../services/authServices.js";
import jwt from "jsonwebtoken";

const authController = {
	// Login de usuario
	login: async (req, res) => {
		try {
			const { nombre, contraseña } = req.body;

			if (!nombre || !contraseña) {
				res.status(400).json({
					error: "Usuario o contraseña son requeridos",
				});
				return;
			}

			const usuarioExiste = await authService.obtenerUsuario(nombre);

			if (!usuarioExiste) {
				res.status(404).json({ error: "Usuario no registrado" });
				return;
			}

			/* const usuario = await authService.login(nombre, contraseña); */

            const validPassword = usuarioExiste.verificarPassword(contraseña);

            if (!validPassword) {
                return res.status(401).json({error: "Contraseña incorrecta"});
            }

			const accessToken = jwt.sign(
				{
					nombre: usuarioExiste.nombre,
					rol: usuarioExiste.role.nombre,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "120s", // 30 segundos
				},
			);

            const refreshToken = jwt.sign(
				{
					nombre: usuarioExiste.nombre,
                    rol: usuarioExiste.role.nombre,
				},
				process.env.JWT_REFRESH_SECRET,
				{
					expiresIn: "1d", // 1 dia
				},
			);
            
            //Si hay errores por aqui, minuto 4h 27m 30s del video de node 7h

            usuarioExiste.refreshToken = refreshToken;
            await usuarioExiste.save();

			res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "None",  maxAge: 24 * 60 * 60 * 1000});
			res.status(202).json({rol:usuarioExiste.role.nombre ,accessToken});

		} catch (error) {
			res.status(500).json({ error: "Error al iniciar sesión", errorMessage: error.message });
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
