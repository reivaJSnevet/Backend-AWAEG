import cateInsumoServices from "../services/cateInsumoRepository.js";

const cateInsumoController = {

    crearCateInsumo: async (req, res) => {
        try {
            const { nombreCateInsumo, descripcionCateInsumo } = req.body;

            // if (!) {

            // }

            const nuevaCateInsumo = await cateInsumoServices.crear({
                nombreCateInsumo,
                descripcionCateInsumo,
            });
            res.status(201).json(nuevaCateInsumo);
        } catch (errors) {
            res.status(400).json({ error: errors });
        }
    },

    obtenerCateInsumo: async (req, res) => {
        try {
            const cateInsumo = await cateInsumoServices.obtenerTodos();
            res.status(200).json(cateInsumo);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener las categorias de insumos",
                detalle: error.message,
            });
        }
    },

    obtenerCateInsumoPorId: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

        try {
            const cateInsumo = await cateInsumoServices.obtenerPorId(id);
            res.status(200).json(cateInsumo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    actualizarCateInsumoPorId: async (req, res) => {
        try {
        const { id } = req.params;
        const { nombreCateInsumo, descripcionCateInsumo } = req.body;

        if (!id || isNaN(id) || !nombreCateInsumo || !descripcionCateInsumo) {
            return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
        }

       await cateInsumoServices.actualizar(id, {
            nombreCateInsumo,
            descripcionCateInsumo,
        });
        res.status(200).json({ message: "Categoria de insumo actualizado correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
    },

    borrarCateInsumoPorId: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

            await cateInsumoServices.borrar(id);
            res.status(200).json({ message: "Categoria de insumo borrado correctamente" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

export default cateInsumoController;