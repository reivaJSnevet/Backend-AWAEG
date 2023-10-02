import { Nota } from "../models/index.js";

const notaRepository = {
	crear: async (nota) => {
		const nuevaNota = await Nota.create(nota);
		return nuevaNota;
	},

	obtenerTodos: async () => {
		const notas = await Nota.findAll();
		return notas;
	},

	obetenerPorId: async (id) => {
		const nota = await Nota.findByPk(id);
		return nota;
	},

	actualizar: async (id, nuevosDatos) => {
		const nota = await Nota.findByPk(id);
		if (!nota) {
			return nota;
		}
		await nota.update(nuevosDatos);
		return nota;
	},

	borrar: async (id) => {
		const nota = await Nota.findByPk(id);
		if (!nota) {
			return nota;
		}
		await nota.destroy();
		return nota;
	},
};

export default notaRepository;
