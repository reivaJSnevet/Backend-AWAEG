import usuarioRepository from "../repositories/usuarioRepository.js";
import { Rol } from "../models/index.js";

const usuarioService = {
	crearUsuario: async (datos) => {
		try {
			const nuevoUsuario = await usuarioRepository.crear(datos);
			return nuevoUsuario;
		} catch (error) {
			console.log(error);
		}
	},

	obtenerTodosUsuario: async () => {
		return await usuarioRepository.obtenerTodos();
	},

	obtenerUsuarioPorId: async (id) => {
		return await usuarioRepository.obtenerPorId(id);
	},

	actualizarUsuario: async (id, nuevosDatos) => {
		return await usuarioRepository.actualizar(id, nuevosDatos);
	},

	borrarUsuario: async (id) => {
		return await usuarioRepository.borrar(id);
	},
};

export default usuarioService;
