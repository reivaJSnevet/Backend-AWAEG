import { Estudiante } from "../models/index.js";

const estudianteRepository = {
    getAll: async () => {
        try {
            return await Estudiante.findAll();
        } catch (error) {
            throw new Error("Error al obtener los estudiantes");
        }
    },

    create: async (estudianteData) => {
        try {
            return await Estudiante.create(estudianteData);
        } catch (error) {
            throw new Error("Error al crear el estudiante");
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
            throw new Error("Error al obtener el estudiante");
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
            throw new Error("Error al actualizar el estudiante");
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
            throw new Error("Error al eliminar el estudiante");
        }
    },
};

export default estudianteRepository;
