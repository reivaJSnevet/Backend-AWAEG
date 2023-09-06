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

	obtenerPorId: async (id) => {
		try {
			const horario = await Horario.findByPk(id);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			return horario;
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (id, nuevosDatos) => {
		try {
			const horario = await Horario.findByPk(id);
			if (!horario) {
				throw new Error("Horario no encontrado");
			}
			await horario.update(nuevosDatos);
			return horario;
		} catch (error) {
			throw error;
		}
	},

	borrar: async (id) => {
		try {
			return await Horario.destroy({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	},
};

export default horarioRepository;
