import grupoRepository from "../repositories/grupoRepository.js";

const grupoService = {
    crearGrupo: async (grupo) => {
        try {
            const nuevoGrupo = await grupoRepository.crear(grupo);
            return nuevoGrupo;
        } catch (error) {
            // Estructura el error y devuelve una lista de errores
            const errors = [];
            if (error.name === "SequelizeValidationError") {
                error.errors.forEach((e) => {
                    errors.push({ field: e.path, message: e.message });
                });
            } else {
                errors.push({ field: "general", message: error.message });
            }
            throw errors; // Lanza la lista de errores
        }
    },

	obtenerTodosGrupos: async () => {
		return await grupoRepository.obtenerTodos();
	},

	obtenerGrupoPorId: async (seccion) => {
		return await grupoRepository.obetenerPorId(seccion);
	},

	actualizarGrupo: async (seccion, nuevosDatos) => {
		return await grupoRepository.actualizar(seccion, nuevosDatos);
	},

	borrarGrupo: async (seccion) => {
		return await grupoRepository.borrar(seccion);
	},
};

export default grupoService;
