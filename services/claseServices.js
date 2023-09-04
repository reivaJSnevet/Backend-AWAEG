import claseRepository from "../repositories/claseRepository.js";

const claseService = {
	crearClase: async (clase) => {
		return await claseRepository.crear(clase);
	},

	obtenerClases: async () => {
		return await claseRepository.obtenerTodos();
	},

	obtenerClasePorId: async (id) => {
		return await claseRepository.obtenerPorId(id);
	},

	actualizarClase: async (id, nuevosDatos) => {
		return await claseRepository.actualizar(id, nuevosDatos);
	},

	borrarClase: async (id) => {
		return await claseRepository.borrar(id);
	},
};

export default claseService;
