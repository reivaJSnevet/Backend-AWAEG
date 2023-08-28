import { Grupo } from "../models/index.js";

const grupoRepository = {

    crear: async (grupo) => {
        try{
            return await Grupo.create(grupo);
        }catch (error){
            console.log(error);
        }
    },

    obtenerTodos: async () => {
        return await Grupo.findAll()
    },

    obetenerPorId: async (seccion) => {
        return await Grupo.findByPk(seccion)
    },

    actualizar: async (seccion, nuevosDatos) => {
        const grupo = await Grupo.findByPk(seccion)

        return await grupo.update(nuevosDatos)
    },

    borrar: async (seccion) => {
        return await Grupo.destroy({
            where: {seccion}
        })
    }
}

export default grupoRepository;