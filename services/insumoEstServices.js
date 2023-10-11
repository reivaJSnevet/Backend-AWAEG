import insumoEstRepository from "../repositories/insumoEstRepository.js";

const insumoEstServices = {
    crear: async (insumoEst) => {
        try{
            const nuevoInsumoEst = await insumoEstRepository.crearInsumoEst(insumoEst);
            return nuevoInsumoEst;
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
            const insumoEst = await insumoEstRepository.obtenerTodos();
            return insumoEst;
        } catch (errors) {
            errors.push({ field: "general", message: error.message });
            throw errors;
        }
    },

    obtenerPorId: async (id) => {
        try {
            const insumoEst = await insumoEstRepository.obtenerPorId(id);
            if (!insumoEst) {
                throw new Error("Insumo no encontrado");
            }
            return insumoEst;
        } catch (error) {
            throw error
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const insumoEst = await insumoEstRepository.actualizar(id, nuevosDatos);
            if (!insumoEst) {
                throw new Error("Insumo no encontrado");
            }
            return insumoEst;
        } catch (error) {
            throw error
        }
    },

    borrar: async (id) => {
       try {
            const insumoEst = await insumoEstRepository.borrar(id);
            if (!insumoEst) {
                throw new Error("Insumo no encontrado");
            }
            return insumoEst;
        } catch (error) {
            throw error
        }
    },

};

export default insumoEstServices;