import usuarioRepository from "../repositories/usuarioRepository.js";
import { Rol } from "../models/index.js";

const usuarioService = {
	crearUsuario: async (datos, id) => {
        try {
            const nuevoUsuario = await usuarioRepository.crear(datos, id);
            return nuevoUsuario;
        } catch (error) {
            const errors = [];
			if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push({
						Type: "Validation Error",
						field: e.path,
						message: e.message,
					});
				});
			} else {
				errors.push({ field: "general", message: error.message });
			}
			throw errors;
        }
	},

	obtenerTodosUsuario: async () => {
		try {
            const usuarios = await usuarioRepository.obtenerTodos();
            return usuarios;
        } catch (error) {
            throw error;
        }
	},

	obtenerUsuarioPorId: async (id) => {
		try{
            const usuario = await usuarioRepository.obtenerPorId(id);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            return usuario;
        }catch(error){
            throw error;
        }
	},

	actualizarUsuario: async (id, nuevosDatos) => {
		try {
            const usuario = await usuarioRepository.actualizar(id, nuevosDatos);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            return usuario;
        } catch (error) {
            throw error;
        }
	},

	borrarUsuario: async (id) => {
		try {
            const usuario = await usuarioRepository.borrar(id);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            return usuario;
        } catch (error) {
            throw error;
        }
	},
};

export default usuarioService;
