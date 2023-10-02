import notaRepository from "../repositories/notaRepository.js";

const notaService = {
	crearNota: async (nota) => {
		try {
            const nuevaNota = await notaRepository.crear(nota);
            return nuevaNota;
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
				errors.push({ field: "general", message: error.message});
			}
			throw errors;
        }
	},

	obtenerTodasNotas: async () => {
		try {
            const notas = await notaRepository.obtenerTodos();
            return notas;
        } catch (error) {
            throw error;
        }
	},

	obtenerNotaPorId: async (id) => {
		try {
            const nota = await notaRepository.obetenerPorId(id);
            if(!nota){
                throw new Error("No existe la nota con el id especificado");
            }
            return nota;
        } catch (error) {
            throw error;
        }
	},

	actualizarNota: async (id, nuevosDatos) => {
		try {
            const nota = await notaRepository.actualizar(id, nuevosDatos);
            if(!nota){
                throw new Error("No existe la nota con el id especificado");
            }
            return nota;
        } catch (error) {
            throw error;
        }
	},

	borrarNota: async (id) => {
		try {
            const nota = await notaRepository.borrar(id);
            if(!nota){
                throw new Error("No existe la nota con el id especificado");
            }
        } catch (error) {
            throw error;
        }
	},
};

export default notaService;
