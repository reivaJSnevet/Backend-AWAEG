import insumoInstRepository from "../repositories/insumoInstRepository.js";

const insumoInstServices = {
    crear: async (insumoInst) => {
        try{
            const nuevoInsumoInst = await insumoInstRepository.crearInsumoInst(insumoInst);
            return nuevoInsumoInst;
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

    obtenerTodos: async () => {
        try {
            const insumoInst = await insumoInstRepository.obtenerTodos();
            return insumoInst;
        } catch (errors) {
            errors.push({ field: "general", message: error.message });
            throw errors;
        }
    },

    obtenerPorId: async (id) => {
        try {
            const insumoInst = await insumoInstRepository.obtenerPorId(id);
            if (!insumoInst) {
                throw new Error("Insumo no encontrado");
            }
            return insumoInst;
        } catch (error) {
            throw error
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const insumoInst = await insumoInstRepository.actualizar(id, nuevosDatos);
            if (!insumoInst) {
                throw new Error("Insumo no encontrado");
            }
            return insumoInst;
        } catch (error) {
            throw error
        }
    },

    borrar: async (id) => {
       try {
           const insumoInst = await insumoInstRepository.borrar(id);
           if (!insumoInst) {
               throw new Error("Insumo no encontrado");
           }
           return insumoInst;
       } catch (error) {
           throw error
       }
    }
};

export default insumoInstServices;