import { Funcionario } from "../models/index.js";

const funcionarioRepository = {

    crear: async (funcionario) => {
        try {
            return await Funcionario.create(funcionario)
        } catch (error) {
            console.log(error)
        }
    },

    obtenerTodos: async () => {
        return await Funcionario.findAll()
    },

    obetenerPorId: async (id) => {
        return await Funcionario.findByPk(id)
    },

    actualizar: async (id, nuevosDatos) => {
        const funcionario = await Funcionario.findByPk(id)

        return await funcionario.update(nuevosDatos)
    },

    borrar: async (id) => {
        return await Funcionario.destroy({
            where: {id}
        })
    }
}

export default funcionarioRepository;