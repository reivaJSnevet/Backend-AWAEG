import { Horario } from "../models/index.js"


const horarioRepository = {

    crear: async (Horario) => {
        try {
            return await Horario.create(horario)
        } catch (error) {
            console.log(error)
        }
    },

    obtenerTodos: async () => {
        return await Horario.findAll()
    },

    obetenerPorId: async (idHorario) => {
        return await Horario.findByPk(idHorario)
    },

    actualizar: async (idHorario, nuevosDatos) => {
        const horario = await Horario.findByPk(idHorario)

        return await horario.update(nuevosDatos)
    },

    borrar: async (idHorario) => {
        return await Horario.destroy({
            where: {idHorario}
        })
    }
}

export default horarioRepository;