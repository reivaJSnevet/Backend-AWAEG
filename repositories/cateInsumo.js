import CateInsumo from "../models/CateInsumo.js";

const cateInsumoRepository = {
    crearCateInsumo: async (cateInsumo) => {
        const nuevaCateInsumo = await CateInsumo.create(cateInsumo);
        return nuevaCateInsumo;
    },

    obtenerTodos: async () => {
        const cateInsumo = await CateInsumo.findAll();
        return cateInsumo;
    },

    obtenerPorId: async (id) => {
        const cateInsumo = await CateInsumo.findByPk(id);
        return cateInsumo;
    },

    actualizar: async (id, nuevosDatos) => {
        const cateInsumo = await CateInsumo.findByPk(id);
        if (!cateInsumo) {
            return cateInsumo;
        }
        await cateInsumo.update(nuevosDatos);
        return cateInsumo;
    },

    borrar: async (id) => {
        const cateInsumo = await CateInsumo.findByPk(id);
        if (!cateInsumo) {
            return cateInsumo;
        }
        await cateInsumo.destroy();
        return cateInsumo;
    }
};

export default cateInsumoRepository;