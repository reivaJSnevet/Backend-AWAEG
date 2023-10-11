import citaRepository from "../repositories/citaRepository.js";


const citaService = {
    crearCita: async (cita) => {
        try {
            const nuevaCita = await citaRepository.crear(cita);
            return nuevaCita;
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

    obtenerCitas: async () => {
        try {
            const citas = await citaRepository.obtenerTodos();
            return citas;
        } catch (errors) {
            errors.push({ field: "general", message: error.message });
            throw errors;
        }

    },

    obtenerCitaPorId: async (id) => {
        try {
            const cita = await citaRepository.obtenerPorId(id);
            if (!cita) {
                throw new Error("Cita no encontrada");
            }
            return cita;
        } catch (error) {
            throw error
        }
    },

    actualizarCita: async (id, nuevosDatos) => {
        try {
            const cita = await citaRepository.actualizar(id, nuevosDatos);
            if (!cita) {
                throw new Error("Cita no encontrada");
            }
            return cita;
        } catch (error) {
            throw error
        }
    },

    borrarCita: async (id) => {
        try {
            const cita = await citaRepository.borrar(id);
            if (!cita) {
                throw new Error("Cita no encontrada");
            }
            return cita;
        } catch (error) {
            throw error
        }
    },
};

export default citaService;