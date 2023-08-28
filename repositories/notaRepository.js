import { Nota } from "../models/index.js";

const notaRepository = {

    crear: async (nota) => {
        try {
            return await Nota.create(nota)
        } catch (error) {
            console.log(error)
        }
    },

    obtenerTodos: async () => {
        return await Nota.findAll()
    },

    obetenerPorId: async (id) => {
        return await Nota.findByPk(id)
    },

    actualizar: async (id, nuevosDatos) => {
        const nota = await Nota.findByPk(id)

        return await nota.update(nuevosDatos)
    },

    borrar: async (id) => {
        return await Nota.destroy({
            where: {id}
        })
    }
};

export default notaRepository;