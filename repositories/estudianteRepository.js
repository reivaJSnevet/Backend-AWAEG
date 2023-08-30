import { Estudiante } from "../models/index.js";
/* import GenericRepository from "./genericRepository.js"; */

//posible implementacion de genericRepositoty
/* const estudianteRepo = new GenericRepository(Estudiante) */

const estudianteRepository = {

    crear: async (estudianteData) => {
        try {
            return await Estudiante.create(estudianteData)
        } catch (error) {
            console.log(error);
        }
    },

    obtenerTodos: async () => {
        try {
            return await Estudiante.findAll()
            /* const estudiantes = await estudianteRepo.getAll();
            console.log('Estudiantes:', estudiantes); */
        } catch (error) {
            console.log(error);
        }
    },

    obtenerPorId: async (id) => {
        try {
            const estudiante = await Estudiante.findByPk(id)
            if (!estudiante) {
                throw new Error("Estudiante no encontrado")
            }
            return estudiante
        } catch (error) {
            console.log(error)
        }
    },

    actualizar: async (id, nuevosDatos) => {
        try {
            const estudiante = await Estudiante.findByPk(id)
            if (!estudiante) {
                throw new Error("Estudiante no encontrado")
            }
            await estudiante.update(nuevosDatos)
            return estudiante
        } catch (error) {
            console.log(error)
        } 
    },

    borrar: async (id) => {
        try {
            const estudiante = await Estudiante.findByPk(id)
            if (!estudiante) {
                throw new Error("Estudiante no encontrado")
            }
        return await Estudiante.destroy({
            where: {id},
        })
        } catch (error) {
            console.log(error)
        }
    },
};

export default estudianteRepository;
