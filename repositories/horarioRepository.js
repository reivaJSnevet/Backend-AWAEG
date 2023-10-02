import { Horario } from "../models/index.js";

const horarioRepository = {
	crear: async (horario) => {
		const nuevoHorario = await Horario.create(horario);
		return nuevoHorario;
	},

	obtenerTodos: async () => {
		const horarios = await Horario.findAll({});
		return horarios;
	},

	obtenerPorId: async (id) => {
		const horario = await Horario.findByPk(id);
		return horario;
	},

	actualizar: async (id, nuevosDatos) => {
		const horario = await Horario.findByPk(id);
		if (!horario) {
			return horario;
		}
		await horario.update(nuevosDatos);
		return horario;
	},

	borrar: async (id) => {
		const horario = await Horario.findByPk(id);
		if (!horario) {
			return horario;
		}
		return await horario.destroy();
	},
};

export default horarioRepository;
