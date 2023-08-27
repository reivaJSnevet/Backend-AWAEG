import rolRepository from '../repositories/rolRepository.js';

class RolService {
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

export default new RolService();
