import claseRepository from "../repositories/claseRepository.js";

const claseService = {
	crearClase: async (clase) => {
		try {
			const nuevaClase = await claseRepository.crear(clase);
			return nuevaClase;
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

	obtenerClases: async () => {
		try {
			const clases = await claseRepository.obtenerTodos();
			return clases;
		} catch (errors) {
			errors.push({ field: "general", message: error.message });
            throw errors;
		}
		
	},

    obtenerClasePorId: async (id) => {
        try {
          const clase = await claseRepository.obtenerPorId(id);
          if (!clase) {
            throw new Error("Clase no encontrada");
          }
          return clase;
        } catch (error) {
          throw error
        }
      },

	actualizarClase: async (id, nuevosDatos) => {
        try {
            const clase = await claseRepository.actualizar(id, nuevosDatos);
            if (!clase) {
              throw new Error("Clase no encontrada");
            }
            return clase;
        } catch (error) {
            throw error
        }
	},

	borrarClase: async (id) => {
        try {
            const clase = await claseRepository.borrar(id);
            if (!clase) {
              throw new Error("Clase no encontrada");
            }
            return clase;
        } catch (error) {
            throw error
        }
	},

    estudiantesPorClase: async (id) => {
        try {
            const estudiantes = await claseRepository.estudiantesPorClase(id);
            return estudiantes;
        } catch (error) {
            throw error
        }
    },

    obtenerFuncionarioMateria: async (id) => {
        try {
            const funcionario = await claseRepository.obtenerFuncionarioMateria(id);
            return funcionario;
        } catch (error) {
            throw error
        }
    }
};

export default claseService;
