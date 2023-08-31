import { Rol, Usuario } from "../models/index.js";

const usuarioRepository = {

    crear: async (usuario) =>{
        try {
            const nuevoUsuario = await Usuario.create(usuario)
            return nuevoUsuario
        } catch (error) {
            throw error
        }
    },

    obtenerTodos: async () => {
        try {
           return await Usuario.findAll({
                attributes: ['nombre', 'correo', 'contraseña'],
                include: [{
                    model: Rol,
                    attributes:['nombre']
                }]
            })
        } catch (error) {
            throw error
        }  
    },

    obtenerPorId: async (id) => {
        try {
            return await Usuario.findByPk(id, {
                attributes: ['nombre', 'correo', 'contraseña'],
                include: [{
                    model: Rol,
                    attributes:['nombre']
                }]
            })            
        } catch (error) {
            throw error
        }

    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const rol = await Usuario.findByPk(id)
            return await rol.update(nuevosDatos)            
        } catch (error) {
            throw error
        }

    },

    borrar: async (id) => {
        try {
            return await Usuario.destroy({
                where: {id},
            })            
        } catch (error) {
            throw error
        }
    }
}


export default usuarioRepository
