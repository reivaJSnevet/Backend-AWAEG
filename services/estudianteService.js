import estudianteRepository from "../repositories/estudianteRepository.js"



const estudianteService = {

    crearEstudiante: async (estudiante) => {
        return await estudianteRepository.crear(estudiante)
    },

    obtenerTodosEstudiante: async () => {
        return await estudianteRepository.obtenerTodos();
    },

    obtenerEstudiantelPorId: async (id) => {
        return await estudianteRepository.obtenerPorId(id);
    },

    actualizarEstudiante: async (id, nuevosDatos) => {
        return await estudianteRepository.actualizar(id, nuevosDatos)
    },

    borrarEstudiante: async (id) => {
        return await estudianteRepository.borrar(id);
    }



    
}

export default estudianteService
