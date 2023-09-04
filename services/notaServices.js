import notaRepository from "../repositories/notaRepository.js";

const notaService = {
	crearNota: async (nota) => {
		return await notaRepository.crear(nota);
	},

	obtenerTodasNotas: async () => {
		return await notaRepository.obtenerTodos();
	},

	obtenerNotaPorId: async (id) => {
		return await notaRepository.obetenerPorId(id);
	},

	actualizarNota: async (id, nuevosDatos) => {
		return await notaRepository.actualizar(id, nuevosDatos);
	},

	borrarNota: async (id) => {
		return await notaRepository.borrar(id);
	},
};

export default notaService;
