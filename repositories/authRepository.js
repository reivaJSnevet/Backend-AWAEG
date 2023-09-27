import { Rol, Usuario } from "../models/index.js";

const authRepository = {
	//login
	login: async (correo, contraseña) => {
		try {
			const user = await Usuario.findOne({
				where: {
					correo,
				},
				attributes: ["nombre", "correo", "contraseña"],
				include: [
					{
						model: Rol,
						attributes: ["nombre"],
					},
				],
			});
			if (user === null) throw new Error("Usuario no encontrado");
	
			if (!contraseña || !user.contraseña) {
				throw new Error('Password or hash is undefined');
			}
	
			const isMatch = await user.verificarPassword(contraseña);
			if (!isMatch) throw new Error("Contraseña incorrecta");
			return user;
		} catch (error) {
			throw error;
		}
	},
	

	//register
	register: async (usuario) => {
		try {
			const nuevoUsuario = await Usuario.create(usuario);
			return nuevoUsuario;
		} catch (error) {
			throw error;
		}
	},

	// verify email
	verifyEmail: async (token) => {
		try {
			const usuario = await Usuario.findOne({
				where: {
					token,
				},
			});
			return usuario;
		} catch (error) {
			throw error;
		}
	},

	// forgot password

	forgotPassword: async (correo) => {
		try {
			const usuario = await Usuario.findOne({
				where: {
					correo,
				},
			});
			return usuario;
		} catch (error) {
			throw error;
		}
	},
};

export default authRepository;
