import grupoRepository from "../repositories/grupoRepository.js";

const grupoService = {
	crearGrupo: async (grupo) => {
		try {
			const nuevoGrupo = await grupoRepository.crear(grupo);
			return nuevoGrupo;
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

	obtenerTodosGrupos: async () => {
		try {
			const grupos = await grupoRepository.obtenerTodos();
			return grupos;
		} catch (errors) {
			throw errors;
		}
	},

	obtenerGrupoPorId: async (seccion) => {
		try {
			const grupo = await grupoRepository.obtenerPorId(seccion);
			const clasesPorDia = {
				lunes: [],
				martes: [],
				miercoles: [],
				jueves: [],
				viernes: [],
			};

			if (grupo.horario && grupo.horario.clases) {
				grupo.horario.clases.forEach((clase) => {
					const dia = clase.dia.toLowerCase(); // Convertir el día a minúsculas
					clasesPorDia[dia].push({
						id: clase.id,
						horaInicio: clase.horaInicio,
						horaSalida: clase.horaSalida,
						leccion: clase.leccion,
						materia: clase.materia.nombre,
					});
				});
			}
			return [clasesPorDia, grupo];

		} catch (error) {
			throw error;
		}
	},

	actualizarGrupo: async (seccion, nuevosDatos) => {
		try {
			const grupo = await grupoRepository.actualizar(
				seccion,
				nuevosDatos,
			);
			if (!grupo) {
				throw new Error("Grupo no encontrado");
			}
			return grupo;
		} catch (error) {
			throw error;
		}
	},

	borrarGrupo: async (seccion) => {
		try {
			const grupo = await grupoRepository.borrar(seccion);
			if (!grupo) {
				throw new Error("Grupo no encontrado");
			}
			return grupo;
		} catch (error) {
			throw error;
		}
	},

    obtenerGruposConClasesPorFuncionario: async (funcionarioId) => {
        try {
            const grupos = await grupoRepository.obtenerGruposConClasesPorFuncionario(funcionarioId);
            return grupos;
        } catch (error) {
            throw error;
        }
    },
};

export default grupoService;
