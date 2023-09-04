import horarioRepository from "../repositories/horarioRepository.js";

const horarioService = {
	crearHorario: async (horario) => {
		return await horarioRepository.crear(horario);
	},

	obtenerTodosHorarios: async () => {
		return await horarioRepository.obtenerTodos();
	},

	obtenerHorarioPorId: async (idHorario) => {
		return await horarioRepository.obetenerPorId(idHorario);
	},

	actualizarHorario: async (idHorario, nuevosDatos) => {
		return await horarioRepository.actualizar(idHorario, nuevosDatos);
	},

	borrarHorario: async (idHorario) => {
		return await horarioRepository.borrar(idHorario);
	},
};

export default horarioService;
