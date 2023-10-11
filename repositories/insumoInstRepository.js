import InsumoInst from "../models/InsumoInst.js";
import CateInsumo from "../models/CateInsumo.js";

const insumoInstRepository = {
    crearInsumoInst: async (insumoInst) => {
        const nuevoInsumoInst = await InsumoInst.create(insumoInst);
        return nuevoInsumoInst;
    },

    obtenerTodos: async () => {
        const insumoInst = await InsumoInst.findAll({
            include: [
                {
                    model: CateInsumo,
                    attributes: ["id", "nombreCateInsumo"],
                },
            ],
        });
        return insumoInst;
    },

    obtenerPorId: async (id) => {
        const insumoInst = await InsumoInst.findByPk(id, {
            include: [
                {
                    model: CateInsumo,
                    attributes: ["id", "nombreCateInsumo"],
                },
            ],
        });
        return insumoInst;
    },

    actualizar: async (id, nuevosDatos) => {
        const insumoInst = await InsumoInst.findByPk(id);
        if (!insumoInst) {
            return insumoInst;
        }
        await insumoInst.update(nuevosDatos);
        return insumoInst;
    },

    borrar: async (id) => {
        const insumoInst = await InsumoInst.findByPk(id);
        if (!insumoInst) {
            return insumoInst;
        }
        return await insumoInst.destroy();
    },
};

export default insumoInstRepository;