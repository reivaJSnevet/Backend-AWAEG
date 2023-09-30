import materiaRepository from "../repositories/materiaRepository.js";

const materiaService = {
	crearMateria: async (materia) => {
		return await materiaRepository.crear(materia);
	},

	obtenerTodasMateria: async () => {
		return await materiaRepository.obtenerTodos();
	},

	obtenerMateriaPorId: async (id) => {
		return await materiaRepository.obetenerPorId(id);
	},

	actualizarMateria: async (id, nuevosDatos) => {
		return await materiaRepository.actualizar(id, nuevosDatos);
	},

	borrarMateria: async (id) => {
		return await materiaRepository.borrar(id);
	},
};

export default materiaService;
