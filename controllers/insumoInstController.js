import insumoInstServices from "../services/insumoInstServices.js";

const insumoInstController = {

    crearInsumoInst: async (req, res) => {
        try {
            const { nombreInsumoInst, disponible, cantidad, descripcion, cateInsumoId } = req.body;

            if (!cateInsumoId || isNaN(cateInsumoId)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [cateInsumoId], o formato incorrecto" });
            }

            const nuevoInsumoInst = await insumoInstServices.crear({
                nombreInsumoInst,
                disponible,
                cantidad,
                descripcion,
                cateInsumoId,
            });
            res.status(201).json(nuevoInsumoInst);
        } catch (errors) {
            res.status(400).json({ error: errors });
        }
    },

    obtenerInsumoInst: async (req, res) => {
        try {
            const insumoInst = await insumoInstServices.obtenerTodos();
            res.status(200).json(insumoInst);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener los insumos",
                detalle: error.message,
            });
        }
    },

    obtenerInsumoInstPorId: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        try {
            const insumoInst = await insumoInstServices.obtenerPorId(id);
            res.status(200).json(insumoInst);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    actualizarInsumoInstPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombreInsumoInst, disponible, cantidad,  descripcion, cateInsumoId } = req.body;

            if (!id || isNaN(id) || !nombreInsumoInst || !disponible|| !cantidad|| isNaN(cantidad) || !descripcion || !cateInsumoId || isNaN(cateInsumoId)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

            const insumoInst = await insumoInstServices.actualizar(id, {
                nombreInsumoInst,
                disponible,
                cantidad,
                descripcion,
                cateInsumoId,
            });
            res.status(200).json(insumoInst);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    borrarInsumoInstPorId: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

            await insumoInstServices.borrar(id);
            res.status(200).json({ message: "Insumo eliminado correctamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
};


export default insumoInstController;