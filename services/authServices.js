import authRepository from '../repositories/authRepository.js';

const authService = {
	login: async (correo, contraseña) => {
		try {
			const usuario = await authRepository.login(correo, contraseña);
			return usuario;
		} catch (error) {
			console.log(error);
		}
	},

	register: async (datos) => {
		try {
			const nuevoUsuario = await authRepository.register(datos);
			return nuevoUsuario;
		} catch (error) {
			return error;
		}
	},

	// verify email
	verifyEmail: async (token) => {
		try {
			const usuario = await authRepository.verifyEmail(token);
			return usuario;
		} catch (error) {
			console.log(error);
		}
	},

	// forgot password
	forgotPassword: async (correo) => {
		try {
			const usuario = await authRepository.forgotPassword(correo);
			return usuario;
		} catch (error) {
			console.log(error);
		}
	},

	// reset password
	resetPassword: async (token, contraseña) => {
		try {
			const usuario = await authRepository.resetPassword(
				token,
				contraseña,
			);
			return usuario;
		} catch (error) {
			console.log(error);
		}
	},
};

export default authService;
