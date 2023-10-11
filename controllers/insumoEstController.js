import insumoEstServices from "../services/insumoEstServices.js";

const insumoEstController = {

    crearInsumoEst: async (req, res) => {
        try {
            const { nombreInsumoEst,disponible, cantidad, descripcion,  cateInsumoId } = req.body;

            if(!cateInsumoId || isNaN(cateInsumoId)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [cateInsumoId], o formato incorrecto" });
            }

            const nuevoInsumoEst = await insumoEstServices.crear({
                nombreInsumoEst,
                disponible,
                cantidad,
                descripcion,
                cateInsumoId,
            });
            res.status(201).json(nuevoInsumoEst);
        } catch (errors) {
            res.status(400).json({ error: errors });
        }
    },

    obtenerInsumoEst: async (req, res) => {
        try {
            const insumoEst = await insumoEstServices.obtenerTodos();
            res.status(200).json(insumoEst);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener los insumos",
                detalle: error.message,
            });
        }
    },

    obtenerInsumoEstPorId: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        try {
            const insumoEst = await insumoEstServices.obtenerPorId(id);
            res.status(200).json(insumoEst);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    actualizarInsumoEstPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombreInsumoEst, disponible, cantidad, descripcion, cateInsumoId } = req.body;

            if (!id || isNaN(id) || !nombreInsumoEst || !disponible|| !cantidad|| isNaN(cantidad) || !descripcion || !cateInsumoId || isNaN(cateInsumoId)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

            await insumoEstServices.actualizar(id, {
                nombreInsumoEst,
                disponible,
                cantidad,
                descripcion,
                cateInsumoId,
            });
            res.status(200).json({ message: "Insumo actualizado correctamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    borrarInsumoEstPorId: async (req, res) => {
        try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        await insumoEstServices.borrar(id);
        res.status(200).json({ message: "Insumo eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    },
};

export default insumoEstController;