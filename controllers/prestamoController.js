import prestamosServices from "../services/prestamosServices.js";

const prestamosController = {
    
    crearPrestamo: async (req, res) => {
        try {
            const { fechPrestamo, estado, averias, funcionarioId } = req.body;
            
            if (!funcionarioId || isNaN(funcionarioId)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [funcionarioId], o formato incorrecto" });
            }

                const nuevoPrestamo = await prestamosServices.crear({
                    fechPrestamo,
                    estado,
                    averias,
                    funcionarioId,
                });
                res.status(201).json(nuevoPrestamo);
        } catch (errors) {
            res.status(400).json({ error: errors });
        }
    },

    obtenerPrestamos: async (req, res) => {
        try {
            const prestamos = await prestamosServices.obtenerTodos();
            res.status(200).json(prestamos);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener los prestamos",
                detalle: error.message,
            });
        }
    },

    obtenerPrestamoPorId: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        try {
            const prestamo = await prestamosServices.obtenerPorId(id);
            res.status(200).json(prestamo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    actualizarPrestamoPorId: async (req, res) => {
        try {
        const { id } = req.params;
        const { fechPrestamo, fechDevolucion, estado, averias, funcionarioId } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        
            const prestamo = await prestamosServices.actualizar(id, {
                fechPrestamo,
                fechDevolucion,
                estado,
                averias,
                funcionarioId,
            });
            res.status(200).json({ message: "Prestamo actualizado correctamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    eliminarPrestamoPorId: async (req, res) => {
        try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }
            await prestamosServices.borrar(id);
            res.status(200).json({ message: "Prestamo eliminado correctamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
};

export default prestamosController;