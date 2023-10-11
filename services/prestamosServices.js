import prestamoRepository from "../repositories/prestamoRepository.js";

const prestamosServices = {
    crear: async (prestamo) => {
        try{
            const nuevoPrestamo = await prestamoRepository.crear(prestamo);
            return nuevoPrestamo;
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
            const prestamo = await prestamoRepository.obtenerTodos();
            return prestamo;
        } catch (errors) {
            errors.push({ field: "general", message: error.message });
            throw errors;
        }
    },

    obtenerPorId: async (id) => {
        try {
            const prestamo = await prestamoRepository.obtenerPorId(id);
            if (!prestamo) {
                throw new Error("Prestamo no encontrado");
            }
            return prestamo;
        } catch (error) {
            throw error
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const prestamo = await prestamoRepository.actualizar(id, nuevosDatos);
            if (!prestamo) {
                throw new Error("Prestamo no encontrado");
            }
            return prestamo;
        } catch (error) {
            throw error
        }
    },

    borrar: async (id) => {
       try {
            const prestamo = await prestamoRepository.borrar(id);
            if (!prestamo) {
                throw new Error("Prestamo no encontrado");
            }
            return prestamo;
        } catch (error) {
            throw error
        }
    },
};

export default prestamosServices;