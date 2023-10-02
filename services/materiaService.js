import materiaRepository from "../repositories/materiaRepository.js";

const materiaService = {
	crearMateria: async (materia) => {
		try {
			const nuevaMateria = await materiaRepository.crear(materia);
			return nuevaMateria;
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

	obtenerTodasMateria: async () => {
		try {
            const materias = await materiaRepository.obtenerTodos();
            return materias;
        } catch (errors) {
            throw errors;
        }
	},

	obtenerMateriaPorId: async (id) => {
		try {
            const materia = await materiaRepository.obetenerPorId(id);
            if(!materia){
                throw new Error("No existe la materia con el id especificado");
            }
            return materia;
        } catch (error) {
            throw error;
        }
	},

	actualizarMateria: async (id, nuevosDatos) => {
		try {
            const materia = await materiaRepository.actualizar(id, nuevosDatos);
            if(!materia){
                throw new Error("No existe la materia con el id especificado");
            }
            return materia;
        } catch (error) {
            throw error;
        }
	},

	borrarMateria: async (id) => {
		try {
            const materia = await materiaRepository.borrar(id);
            if(!materia){
                throw new Error("No existe la materia con el id especificado");
            }
            return materia;
        } catch (error) {
            throw error;
        }
	},
};

export default materiaService;
