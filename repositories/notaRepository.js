import { Nota } from "../models/index.js";

const notaRepository = {
	crear: async (nota) => {
		try {
			return await Nota.create(nota);
		} catch (error) {
			throw error;
		}
	},

	obtenerTodos: async () => {
		try {
			return await Nota.findAll();
		} catch (error) {
			throw error;
		}
	},

	obetenerPorId: async (id) => {
		try {
			const nota = await Nota.findByPk(id);
			if (!nota) {
				throw new Error("Nota no encontrada");
			}
			return nota;
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (id, nuevosDatos) => {
		try {
			const nota = await Nota.findByPk(id);
			if (!nota) {
				throw new Error("Nota no encontrada");
			}
			await nota.update(nuevosDatos);
			return nota;
		} catch (error) {
			throw error;
		}
	},

	borrar: async (id) => {
		try {
			const nota = await Nota.findByPk(id);
			if (!nota) {
				throw new Error("Nota no encontrada");
			}
			return await Nota.destroy({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	},
};

export default notaRepository;
