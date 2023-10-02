import prematriculaRepository from "../repositories/prematriculaRepository.js";

const prematriculaServices = { 

    crearPrematricula: async (prematricula) => {
        try {
            const nuevaPrematricula = await prematriculaRepository.crear(prematricula);
            return nuevaPrematricula;
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

    obtenerPrematriculas: async () => {
        try {
            const prematriculas = await prematriculaRepository.obtenerTodos();
            return prematriculas;
        } catch (error) {
            throw error;
        }
    },

    obtenerPrematriculaPorId: async (id) => {
        try {
            const prematricula = await prematriculaRepository.obtenerPorId(id);
            if (!prematricula) {
                throw new Error( "No se encontró la prematricula") ;
            }
            return prematricula;
        } catch (error) {
            throw error;
        }
    },

    actualizarPrematricula: async (id, nuevosDatos) => {
        try {
            const prematricula = await prematriculaRepository.actualizar(id, nuevosDatos);
            if (!prematricula) {
                throw new Error( "No se encontró la prematricula") ;
            }
            return prematricula;
        } catch (error) {
            throw error;
        }
    },

    borrarPrematricula: async (id) => {
        try {
            const prematricula = await prematriculaRepository.borrar(id);
            if (!prematricula) {
                throw new Error( "No se encontró la prematricula") ;
            }
            return prematricula;
        } catch (error) {
            throw error;
        }
    },  
};

export default prematriculaServices;