import solicitudService from "../services/solicitudServices.js";

const solicitudController = {
    getAllSolicitudes: async (req, res) => {
        try {
            const solicitudes = await solicitudService.obtenerTodos();
            res.status(200).json(solicitudes);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las solicitudes", detalle: error.message });
        }
    }
};

export default solicitudController;



