import { Funcionario } from "../models/index.js";

const funcionarioRepository = {

    crear: async (funcionario) => {
        try {
            return await Funcionario.create(funcionario)
        } catch (error) {
            throw error
        }
    },

    obtenerTodos: async () => {
        try{
        return await Funcionario.findAll()
        }catch (error){
            throw error
        }
    },

    obtenerPorId: async (id) => {
        try {
            const funcionario = await Funcionario.findByPk(id)
            if (!funcionario) {
                throw new Error("Funcionario no encontrado")
            }
            return funcionario
        } catch (error) {
            throw error
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const funcionario = await Funcionario.findByPk(id)
            if (!funcionario) {
                throw new Error("Funcionario no encontrado")
            }
            await funcionario.update(nuevosDatos)
            return funcionario;
        } catch (error) {
            throw error
        }
    },

    borrar: async (id) => {
        try {
            const funcionario = await Funcionario.findByPk(id)
            if (!funcionario) {
                throw new Error("Funcionario no encontrado")
            }
        return await Funcionario.destroy({
            where: {id},
        })
        } catch (error) {
            throw error
        }
    }
}

export default funcionarioRepository;