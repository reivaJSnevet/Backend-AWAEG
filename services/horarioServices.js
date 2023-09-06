import horarioRepository from "../repositories/horarioRepository.js";

const horarioService = {
	crearHorario: async (horario) => {
		return await horarioRepository.crear(horario);
	},

	obtenerTodosHorarios: async () => {
		return await horarioRepository.obtenerTodos();
	},

	obtenerHorarioPorId: async (id) => {
		return await horarioRepository.obtenerPorId(id);
	},

	actualizarHorario: async (id, nuevosDatos) => {
		return await horarioRepository.actualizar(id, nuevosDatos);
	},

	borrarHorario: async (id) => {
		return await horarioRepository.borrar(id);
	},
};

export default horarioService;
