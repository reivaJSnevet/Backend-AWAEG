import { Rol } from "../models/index.js";

const rolRepository = {
	crear: async (rol) => {
        const nuevoRol = await Rol.create(rol)
		return nuevoRol;
	},

	obtenerTodos: async () => {
		const roles = await Rol.findAll();
        return roles;
	},

	obtenerPorId: async (id) => {
        const rol = await Rol.findByPk(id)
        return rol;
    },

	actualizar: async (id, nuevosDatos) => {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            return rol
        }

        return await rol.update(nuevosDatos);
	},

	borrar: async (id) => {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            return rol
        }

        return await rol.destroy();
	},
};

export default rolRepository;

//Manera usando clases en vez de objetos literales

/* class rolRepository{

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

export default new rolRepository() */
