import horarioRepository from "../repositories/horarioRepository.js";

const horarioService = {
	crearHorario: async (horario) => {
		try {
			const nuevoHorario = await horarioRepository.crear(horario);
			return nuevoHorario;
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

	obtenerTodosHorarios: async () => {
		try {
			const horarios = await horarioRepository.obtenerTodos();
			return horarios;
		} catch (errors) {
			errors.push({ field: "general", message: error.message });
			throw errors;
		}
	},

	obtenerHorarioPorId: async (id) => {
		try {
			const horario = await horarioRepository.obtenerPorId(id);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			return horario;
		} catch (error) {
			throw error;
		}
	},

	actualizarHorario: async (id, nuevosDatos) => {
		try {
			const horario = await horarioRepository.actualizar(id,nuevosDatos,);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			return horario;
		} catch (error) {
			throw error;
		}
	},

	borrarHorario: async (id) => {
		try {
			const horario = await horarioRepository.borrar(id);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			return horario;
		} catch (error) {
			throw error;
		}
	},
};

export default horarioService;
