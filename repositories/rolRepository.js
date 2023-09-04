import { Rol } from "../models/index.js";

const rolRepository = {
	crear: async (rol) => {
		try {
			return await Rol.create(rol);
		} catch (error) {
			throw error;
		}
	},

	obtenerTodos: async () => {
		try {
			return await Rol.findAll();
		} catch (error) {
			throw error;
		}
	},

	obtenerPorId: async (id) => {
		try {
			return await Rol.findByPk(id);
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (id, nuevosDatos) => {
		try {
			const rol = await Rol.findByPk(id);
			return await rol.update(nuevosDatos);
		} catch (error) {
			throw error;
		}
	},

	borrar: async (id) => {
		try {
			return await Rol.destroy({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
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
