import InsumoEst from "../models/InsumoEst.js";
import CateInsumo from "../models/CateInsumo.js";

const insumoEstRepository = {
    crearInsumoEst: async (insumoEst) => {
        const nuevoInsumoEst = await InsumoEst.create(insumoEst);
        return nuevoInsumoEst;
    },

    obtenerTodos: async () => {
        const insumoEst = await InsumoEst.findAll({
            include: [
                {
                    model: CateInsumo,
                    attributes: ["id", "nombreCateInsumo"],
                },
            ],
        });
        return insumoEst;
    },

    obtenerPorId: async (id) => {
        const insumoEst = await InsumoEst.findByPk(id, {
            include: [
                {
                    model: CateInsumo,
                    attributes: ["id", "nombreCateInsumo"],
                },
            ],
        });
        return insumoEst;
    },

    actualizar: async (id, nuevosDatos) => {
        const insumoEst = await InsumoEst.findByPk(id);
        if (!insumoEst) {
            return insumoEst;
        }
        await insumoEst.update(nuevosDatos);
        return insumoEst;
    },

    borrar: async (id) => {
        const insumoEst = await InsumoEst.findByPk(id);
        if (!insumoEst) {
            return insumoEst;
        }
        return await insumoEst.destroy();
    },
};

export default insumoEstRepository;