import { Estudiante } from "../models/index.js";
import GenericRepository from "./genericRepository.js";


const estudianteRepo = new GenericRepository(Estudiante);

const estudianteRepository = {
    getAll: async () => {
        try {
            const estudiantes = await estudianteRepo.getAll();
            console.log('Estudiantes:', estudiantes);
        } catch (error) {
            console.log(error);
        }
    },

    create: async (estudianteData) => {
        try {
            return await Estudiante.create(estudianteData);
        } catch (error) {
            console.log(error);
        }
    },

    getById: async (id) => {
        try {
            const estudiante = await Estudiante.findByPk(id);
            if (!estudiante) {
                throw new Error("Estudiante no encontrado");
            }
            return estudiante;
        } catch (error) {
            console.log(error);
        }
    },

    updateById: async (id, updatedData) => {
        try {
            const estudiante = await Estudiante.findByPk(id);
            if (!estudiante) {
                throw new Error("Estudiante no encontrado");
            }
            await estudiante.update(updatedData);
            return estudiante;
        } catch (error) {
            console.log(error);
        } 
    },

    deleteById: async (id) => {
        try {
            const estudiante = await Estudiante.findByPk(id);
            if (!estudiante) {
                throw new Error("Estudiante no encontrado");
            }
            await estudiante.destroy();
            return true;
        } catch (error) {
            console.log(error);
        }
    },
};

export default estudianteRepository;
