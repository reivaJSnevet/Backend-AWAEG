import archivoRepository from "../repositories/archivoRepository.js";

const archivoService = {

    subirArchivo: async (archivo) => {
        try {
            const nuevoArchivo = await archivoRepository.crear(archivo);
            return nuevoArchivo;
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

    obtenerArchivos: async () => {
        try {
            const archivos = await archivoRepository.obtenerTodos();
            return archivos;
        } catch (errors) {
            errors.push({ field: "general", message: error.message });
            throw errors;
        }

    },

    obtenerArchivoPorId: async (id) => {
        try {
            const archivo = await archivoRepository.obtenerPorId(id);
            if (!archivo) {
                throw new Error("Archivo no encontrado");
            }
            return archivo;
        } catch (error) {
            throw error
        }
    },

    obtenerArchivosPorIdTodos: async (id) => {
      try {
        const archivos = await archivoRepository.obtenerPorIdTodos(id);
        if (!archivos) {
          throw new Error("Archivos no encontrados");
        }
        return archivos;
        
      } catch (error) {
        throw error;
      }
        
    },


    borrarArchivo: async (id) => {
        try {
            const archivo = await archivoRepository.borrar(id);
            if (!archivo) {
                throw new Error("Archivo no encontrado");
            }
            return archivo;
        } catch (error) {
            throw error
        }
    },

};

export default archivoService;