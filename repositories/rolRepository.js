import { Rol } from "../models/index.js";

class rolRepository{

    async crear(nombre, nivelPrivilegio, descripcion){
        return await Rol.create({
            nombre,
            nivelPrivilegio,
            descripcion,
        })
    }
    
    async obtenerTodos(){
        return await Rol.findAll()
    }

    async obtenerPorId(id){
        return await Rol.findByPk(id)
    }

    async actualizar(id, nombre, nivelPrivilegio, descripcion){
        const rol = await Rol.findByPk(id)

        if(!rol){
            throw new Error("Rol no encontrado")
        }

        return await rol.update({nombre, nivelPrivilegio, descripcion})
    }

    async borrar(id){
        return await Rol.destroy({
            where: {id},
        })
    }
}

export default new rolRepository()