import solicitudRepositiry from '../repositories/solicitudRepository.js';

const solicitudService = {
    obtenerTodos: async () => {
        try {
            const solicitudes = await solicitudRepositiry.ObtenerTodos();
            return solicitudes;
        } catch (error) {
            throw error;
        }
    },
};

export default solicitudService;