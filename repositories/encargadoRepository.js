import { Encargado } from "../models/index.js";

const encargadoRepository = {
	crear: async (encargado) => {
		const nuevoEncargado = await Encargado.create(encargado);
		return nuevoEncargado;
	},

	obtenerTodos: async () => {
		const encargados = await Encargado.findAll();
		return encargados;
	},

	obtenerPorId: async (id) => {
		const encargado = await Encargado.findByPk(id);
		return encargado;
	},

	actualizar: async (id, nuevosDatos) => {
		const encargado = await Encargado.findByPk(id);
		if (!encargado) {
			return encargado;
		}
		await encargado.update(nuevosDatos);
		return encargado;
	},

	borrar: async (id) => {
		const encargado = await Encargado.findByPk(id);
		if (!encargado) {
			return encargado;
		}
		return await encargado.destroy();
	},
};

export default encargadoRepository;
