import { Rol, Usuario } from "../models/index.js";

const usuarioRepository = {

    crear: async (usuario) =>{
        const nuevoUsuario = await Usuario.create(usuario)
        return nuevoUsuario
    },

    obtenerTodos: async () => {
            return await Usuario.findAll({
                attributes: ['nombre', 'correo', 'contraseña'],
                include: [{
                    model: Rol,
                    attributes:['nombre']
                }]
            })
    },

    obtenerPorId: async (id) => {
        return await Usuario.findByPk(id, {
            attributes: ['nombre', 'correo', 'contraseña'],
            include: [{
                model: Rol,
                attributes:['nombre']
            }]
        })
    },

    actualizar: async (id, nuevosDatos) => {
        const rol = await Usuario.findByPk(id)
        return await rol.update(nuevosDatos)
    },

    borrar: async (id) => {
        return await Usuario.destroy({
            where: {id},
        })
    }
}


export default usuarioRepository
