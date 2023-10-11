import { Sequelize } from "sequelize";
import { Rol, Usuario } from "../models/index.js";

const authRepository = {
	//login
	obtener: async (nombre) => {
		const user = await Usuario.findOne({
			where: {
				nombre,
			},
			attributes: ["id", "nombre", "correo", "contraseña", "refreshToken"],
			include: [
				{
					model: Rol,
					attributes: ["nombre"],
				},
			],
		});
		return user;
	},

    obtenerPorReToken: async (refreshToken) => {
		const user = await Usuario.findOne({
			where: {
				refreshToken,
			},
			attributes: ["id", "nombre", "correo", "contraseña"],
			include: [
				{
					model: Rol,
					attributes: ["nombre"],
				},
			],
		});
		return user;
	},

    obtenerTodos: async (nombre) => {
		const users = await Usuario.findAll({
			where: {
				nombre:{
                    [Sequelize.Op.not]: nombre
                }
			},
/* 			attributes: ["id", "nombre", "correo", "contraseña"],
			include: [
				{
					model: Rol,
					attributes: ["nombre"],
				},
			], */
		});
		return user;
	},

	login: async (nombre, contraseña) => {
		try {
			const user = await Usuario.findOne({
				where: {
					nombre,
				},
				attributes: ["id", "nombre", "correo", "contraseña"],
				include: [
					{
						model: Rol,
						attributes: ["nombre"],
					},
				],
			});

			if (!user) {
				return user;
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
