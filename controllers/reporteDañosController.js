import reporteDañosServices from "../services/reporteDañosServices.js";

const reporteDañosController = {

    crearReporteDaños: async (req, res) => {
        try {
            const { categoriaDaño, descripcionDaño, prestamoId } = req.body;

            if (!prestamoId || isNaN(prestamoId)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [prestamosId], o formato incorrecto" });
            }

            const nuevoReporteDaños = await reporteDañosServices.crear({
                categoriaDaño,
                descripcionDaño,
                prestamoId,
            });
            res.status(201).json(nuevoReporteDaños);
        } catch (errors) {
            res.status(400).json({ error: errors });
        }
    },

    obtenerReporteDaños: async (req, res) => {
        try {
            const reporteDaños = await reporteDañosServices.obtenerTodos();
            res.status(200).json(reporteDaños);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener los reportes de daños",
                detalle: error.message,
            });
        }
    },

    obtenerReporteDañosPorId: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        try {
            const reporteDaños = await reporteDañosServices.obtenerPorId(id);
            res.status(200).json(reporteDaños);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    actualizarReporteDañosPorId: async (req, res) => {
        try {
        const { id } = req.params;
        const { categoriaDaño, descripcionDaño, prestamoId } = req.body;

        if (!id || isNaN(id) || !categoriaDaño || !descripcionDaño || !prestamoId || isNaN(prestamoId)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

       await reporteDañosServices.actualizar(id, {
            categoriaDaño,
            descripcionDaño,
            prestamoId,
        });
        res.status(200).json({ message: "Reporte de daños actualizado correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    },

    borrarReporteDañosPorId: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        try {
            await reporteDañosServices.borrar(id);
            res.status(200).json({ message: "Reporte de daños borrado correctamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
};

export default reporteDañosController;