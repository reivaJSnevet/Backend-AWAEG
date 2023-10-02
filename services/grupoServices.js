import grupoRepository from "../repositories/grupoRepository.js";

const grupoService = {
    crearGrupo: async (grupo) => {
        try {
			const nuevoGrupo = await grupoRepository.crear(grupo);
			return nuevoGrupo;
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

	obtenerTodosGrupos: async () => {
		try {
            const grupos = await grupoRepository.obtenerTodos();
            return grupos;
        } catch (errors) {
            throw errors;
        }
		
	},

	obtenerGrupoPorId: async (seccion) => {
		try {
            const grupo = await grupoRepository.obtenerPorId(seccion);
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            return grupo;
        } catch (error) {
            throw error
        }
	},

	actualizarGrupo: async (seccion, nuevosDatos) => {
		try {
            const grupo = await grupoRepository.actualizar(seccion, nuevosDatos);
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            return grupo;
        } catch (error) {
            throw error
        }
	},

	borrarGrupo: async (seccion) => {
		try {
            const grupo = await grupoRepository.borrar(seccion);
            if (!grupo) {
                throw new Error("Grupo no encontrado");
            }
            return grupo;
        } catch (error) {
            throw error
        }
	},
};

export default grupoService;
