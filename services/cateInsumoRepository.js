import cateInsumoRepository from "../repositories/cateInsumo.js";

const cateInsumoServices = {
    crear: async (cateInsumo) => {
        try{
            const nuevaCateInsumo = await cateInsumoRepository.crearCateInsumo(cateInsumo);
            return nuevaCateInsumo;
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
            const cateInsumo = await cateInsumoRepository.obtenerTodos();
            return cateInsumo;
        } catch (errors) {
            errors.push({ field: "general", message: error.message });
            throw errors;
        }
    },

    obtenerPorId: async (id) => {
        try {
            const cateInsumo = await cateInsumoRepository.obtenerPorId(id);
            if (!cateInsumo) {
                throw new Error("Categoria de insumo no encontrado");
            }
            return cateInsumo;
        } catch (error) {
            throw error
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const cateInsumo = await cateInsumoRepository.actualizar(id, nuevosDatos);
            if (!cateInsumo) {
                throw new Error("Categoria de insumo no encontrado");
            }
            return cateInsumo;
        } catch (error) {
            throw error
        }
    },

    borrar: async (id) => {
       try {
            const cateInsumo = await cateInsumoRepository.borrar(id);
            if (!cateInsumo) {
                throw new Error("Categoria de insumo no encontrado");
            }
            return cateInsumo;
        } catch (error) {
            throw error
        }
    }
};

export default cateInsumoServices;