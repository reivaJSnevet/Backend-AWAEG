import encargadoRepository from "../repositories/encargadoRepository.js";

const encargadoService = {
	crearEncargado: async (encargado) => {
		return await encargadoRepository.crear(encargado);
	},

	obtenerTodosEncargados: async () => {
		return await encargadoRepository.obtenerTodos();
	},

	obtenerEncargadoPorId: async (id) => {
		return await encargadoRepository.obtenerPorId(id);
	},

	actualizarEncargado: async (id, nuevosDatos) => {
		return await encargadoRepository.actualizar(id, nuevosDatos);
	},

	borrarEncargado: async (id) => {
		return await encargadoRepository.borrar(id);
	},
};

export default encargadoService;
