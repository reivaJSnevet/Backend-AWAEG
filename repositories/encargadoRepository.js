import { Encargado } from "../models/index.js";

const encargadoRepository = {

    crear: async (encargado) => {
        try{
            return await Encargado.create(encargado);
        }catch (error){
            console.log(error);
        }
    },

    obtenerTodos: async () => {
        return await Encargado.findAll()
    },

    obetenerPorId: async (id) => {
        return await Encargado.findByPk(id)
    },

    actualizar: async (id, nuevosDatos) => {
        const encargado = await Encargado.findByPk(id)

        return await encargado.update(nuevosDatos)
    },

    borrar: async (id) => {
        return await Encargado.destroy({
            where: {id}
        })
    }
}

export default encargadoRepository;