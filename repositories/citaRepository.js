import { Cita } from "../models/index.js";

const citaRepository = {
    crear: async (cita) => {
        const nuevaCita = await Cita.create(cita);
        return nuevaCita;
    },
    obtenerTodos: async () => {
        const citas = await Cita.findAll();
        return citas;
    },
    obtenerPorId: async (id) => {
        const cita = await Cita.findAll({where: {estudianteId: id}});
        return cita;
    },
    actualizar: async (id, datos) => {
        const  cita = await Cita.findByPk(id);
        if (!cita) {
            return cita;
        }
        await cita.update(datos);
        return cita;
    },
    borrar: async (id) => {
        const cita = await Cita.findByPk(id);
        if (!cita) {
            return cita;
        }
        return await cita.destroy();
    },
    citasLibres: async () => {
        const citas = await Cita.findAll({where: {estudianteId: null}});
        return citas;
    }
};

export default citaRepository;