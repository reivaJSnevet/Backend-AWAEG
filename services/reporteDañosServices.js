import reporteDañosRepository from "../repositories/reporteDañosRepository.js";

const reporteDañosServices = {
    crear: async (reporteDaños) => {
        try{
            const nuevoReporteDaños = await reporteDañosRepository.crearReporteDaños(reporteDaños);
            return nuevoReporteDaños;
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
            const reporteDaños = await reporteDañosRepository.obtenerTodos();
            return reporteDaños;
        } catch (errors) {
            errors.push({ field: "general", message: error.message });
            throw errors;
        }
    },

    obtenerPorId: async (id) => {
        try {
            const reporteDaños = await reporteDañosRepository.obtenerPorId(id);
            if (!reporteDaños) {
                throw new Error("Reporte de daños no encontrado");
            }
            return reporteDaños;
        } catch (error) {
            throw error
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const reporteDaños = await reporteDañosRepository.actualizar(id, nuevosDatos);
            if (!reporteDaños) {
                throw new Error("Reporte de daños no encontrado");
            }
            return reporteDaños;
        } catch (error) {
            throw error
        }
    },

    borrar: async (id) => {
       try {
            const reporteDaños = await reporteDañosRepository.borrar(id);
            if (!reporteDaños) {
                throw new Error("Reporte de daños no encontrado");
            }
            return reporteDaños;
        } catch (error) {
            throw error
        }
    },
};

export default reporteDañosServices;