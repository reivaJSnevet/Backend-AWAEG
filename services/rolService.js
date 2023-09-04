import rolRepository from "../repositories/rolRepository.js";

const rolService = {
	crearRol: async (rol) => {
		return await rolRepository.crear(rol);
	},

	obtenerTodosRol: async () => {
		return await rolRepository.obtenerTodos();
	},

	obtenerRolPorId: async (id) => {
		return await rolRepository.obtenerPorId(id);
	},

	actualizarRol: async (id, nuevosDatos) => {
		return await rolRepository.actualizar(id, nuevosDatos);
	},

	borrarRol: async (id) => {
		return await rolRepository.borrar(id);
	},
};

export default rolService;

/* class RolService {
    async crearRol(nombre, nivelPrivilegio, descripcion) {
        return await rolRepository.crear(nombre, nivelPrivilegio, descripcion);
    }

    async obtenerTodosRol() {
        return await rolRepository.obtenerTodos();
    }

    async obtenerRolPorId(id) {
        return await rolRepository.obtenerPorId(id);
    }

    async actualizarRol(id, nombre, nivelPrivilegio, descripcion){
        return await rolRepository.actualizar(id, nombre, nivelPrivilegio, descripcion)
    }

    async borrarRol(id) {
        return await rolRepository.borrar(id);
    }
}

export default new RolService(); */
