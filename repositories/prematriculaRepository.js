import { Prematricula, Estudiante } from "../models/index.js";

const prematriculaRepository = {
    crear: async (prematricula) => {
        const nuevaPrematricula = await Prematricula.create(prematricula);
        return nuevaPrematricula;
    },

    obtenerTodos: async () => {
        const prematriculas = await Prematricula.findAll({
            include: [
                {
                    model: Estudiante,
                    attributes: ["nombre", "apellido1", "apellido2",],
                },
            ]
        });
        return prematriculas;
    },

    obtenerPorId: async (id) => {
        const prematricula = await Prematricula.findByPk(id, {
            include: [
                {
                    model: Estudiante,
                    attributes: ["nombre", "apellido1", "apellido2",],
                },
            ]
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
        return await prematricula.destroy();
    },
};

export default prematriculaRepository;
