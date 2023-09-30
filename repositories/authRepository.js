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
			if (!user){
                throw new Error("Usuario no encontrado");
            }

            const isPasswordValid = await user.verificarPassword(contraseña);

			if (!isPasswordValid) {
				throw new Error("Contraseña incorrecta");
			}
            
            return user;
		} catch (error) {
            throw new Error(`Error en la autenticación: ${error.message}`);
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
