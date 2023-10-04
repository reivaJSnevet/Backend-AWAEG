import estudianteRepository from "../repositories/estudianteRepository.js";

const estudianteService = {
	crearEstudiante: async (estudiante) => {
		try {
			const nuevoEstudiante = await estudianteRepository.crear(estudiante);
			return nuevoEstudiante;
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

	obtenerTodosEstudiante: async () => {
		try {
			const estudiantes = await estudianteRepository.obtenerTodos();
			return estudiantes;
		} catch (errors) {
			errors.push({ field: "general", message: error.message });
			throw errors;
		}
	},

	obtenerEstudiantelPorId: async (id, mostrarNotas) => {
        try {
            if (mostrarNotas === true) {
                const estudiante = await estudianteRepository.estudianteNotas(id);
                if (!estudiante) {
                    throw new Error("Estudiante no encontrado");
                }
                return estudiante;
            }else{
                const estudiante = await estudianteRepository.obtenerPorId(id);
                if (!estudiante) {
                    throw new Error("Estudiante no encontrado");
                }
                return estudiante;
            }
		} catch (error) {
			throw error
		}
	},

	actualizarEstudiante: async (id, nuevosDatos) => {
		try {
			const estudiante = await estudianteRepository.actualizar(id, nuevosDatos);
			if (!estudiante) {
				throw new Error("Estudiante no encontrado");
			}
			return estudiante;
		} catch (error) {
			throw error
		}
	},

	borrarEstudiante: async (id) => {
		try {
			const estudiante = await estudianteRepository.borrar(id);
			if (!estudiante) {
				throw new Error("Estudiante no encontrado");
			}
			return estudiante;
		} catch (error) {
			throw error
		}
	},

    estudianteByUsuarioId: async (id) => {
        try {
            const estudiante = await estudianteRepository.estudianteByUsuarioId(id);
            if (!estudiante) {
                throw new Error("Estudiante no encontrado");
            }
            return estudiante;
        } catch (error) {
            throw error
        }
    }
};

export default estudianteService;
