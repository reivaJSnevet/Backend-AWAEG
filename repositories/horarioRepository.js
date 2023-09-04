import { Horario } from "../models/index.js";

const horarioRepository = {
	crear: async (horario) => {
		try {
			return await Horario.create(horario);
		} catch (error) {
			throw error;
		}
	},

	obtenerTodos: async () => {
		try {
			return await Horario.findAll();
		} catch (error) {
			throw error;
		}
	},

	obetenerPorId: async (idHorario) => {
		try {
			const horario = await Horario.findByPk(idHorario);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			return horario;
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (idHorario, nuevosDatos) => {
		try {
			const horario = await Horario.findByPk(idHorario);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			await horario.update(nuevosDatos);
			return horario;
		} catch (error) {
			throw error;
		}
	},

	borrar: async (idHorario) => {
		try {
			const horario = await Horario.findByPk(idHorario);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			return await Horario.destroy({
				where: { idHorario },
			});
		} catch (error) {
			throw error;
		}
	},
};

export default horarioRepository;
