import { Prematricula } from "../models/index.js";

const prematriculaRepository = {
    crear: async (prematricula) => {
        try{
        const nuevaPrematricula = await Prematricula.create(prematricula);
        return nuevaPrematricula;
        }
        catch(error){
            throw error;
        }
    },

    obtenerTodos: async () => {
        const prematriculas = await Prematricula.findAll({
            include: ["estudiante"],
        });
        return prematriculas;
    },

    obtenerPorId: async (id) => {
        const prematricula = await Prematricula.findByPk(id, {
            include: ["estudiante"],
        });
        return prematricula;
    },

    actualizar: async (id, nuevosDatos) => {
        const prematricula = await Prematricula.findByPk(id);
        if (!prematricula) {
            return prematricula;
        }
        await prematricula.update(nuevosDatos);
        return prematricula;
    },

    borrar: async (id) => {
        const prematricula = await Prematricula.findByPk(id);
        if (!prematricula) {
            return prematricula;
        }
        await prematricula.destroy();
        return prematricula;
    },
};

export default prematriculaRepository;
