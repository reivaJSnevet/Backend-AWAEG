import rolRepository from "../repositories/rolRepository.js";

const rolService = {
	crearRol: async (rol) => {
		try {
            const nuevoRol = await rolRepository.crear(rol)
            return nuevoRol;
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

	obtenerTodosRol: async () => {
		try {
            const roles = await rolRepository.obtenerTodos()
            return roles;
        } catch (error) {
            throw error;
        }
	},

	obtenerRolPorId: async (id) => {
		try {
            const rol = await rolRepository.obtenerPorId(id)
            if(!rol){
                throw new Error("Rol no encontrado")
            }
            return rol;
        } catch (error) {
            throw error;
        }
	},

	actualizarRol: async (id, nuevosDatos) => {
		try {
            const rol = await rolRepository.actualizar(id, nuevosDatos)
            if(!rol){
                throw new Error("Rol no encontrado")
            }
            return rol;
        } catch (error) {
            throw error;
        }
	},

	borrarRol: async (id) => {
		try {
            const rol = await rolRepository.borrar(id)
            if(!rol){
                throw new Error("Rol no encontrado")
            }
            return rol;
        } catch (error) {
            throw error;
        }
	},
};

export default rolService;
