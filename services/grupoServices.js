import grupoRepository from "../repositories/grupoRepository.js";

const grupoService = {
	crearGrupo: async (grupo) => {
		return await grupoRepository.crear(grupo);
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
