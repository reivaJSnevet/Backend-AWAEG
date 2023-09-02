import { Encargado } from "../models/index.js";

const encargadoRepository = {

    crear: async (encargado) => {
        try{
            return await Encargado.create(encargado);
        }catch (error){
            throw error;
        }
    },

    obtenerTodos: async () => {
        try{
            return await Encargado.findAll()
            }catch (error){
                throw error
            }
    },

    obetenerPorId: async (id) => {
        try {
            const encargado = await Encargado.findByPk(id)
            if (!encargado) {
                throw new Error("Encargado no encontrado")
            }
            return encargado
        } catch (error) {
            throw error
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const encargado = await Encargado.findByPk(id)
            if (!encargado) {
                throw new Error("Encargado no encontrado")
            }
            await encargado.update(nuevosDatos)
            return encargado;
        } catch (error) {
            throw error
        }
    },

    borrar: async (id) => {
        try {
            const encargado = await Encargado.findByPk(id)
            if (!encargado) {
                throw new Error("Encargado no encontrado")
            }
        return await Encargado.destroy({
            where: {id},
        })
        } catch (error) {
            throw error
        }
    }
}

export default encargadoRepository;