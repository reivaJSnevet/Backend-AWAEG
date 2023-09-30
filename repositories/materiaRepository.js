import { Materia } from "../models/index.js";

const materiaRepository = {
	crear: async (materia) => {
		try {
			return await Materia.create(materia);
		} catch (error) {
			throw error;
		}
	},

	obtenerTodos: async () => {
		try {
			return await Materia.findAll();
		} catch (error) {
			throw error;
		}
	},

	obetenerPorId: async (id) => {
		try {
			const materia = await Materia.findByPk(id);
			if (!materia) {
				throw new Error("Materia no encontrada");
			}
			return materia;
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (id, nuevosDatos) => {
		try {
			const materia = await Materia.findByPk(id);
			if (!materia) {
				throw new Error("Materia no encontrada");
			}
			await materia.update(nuevosDatos);
			return materia;
		} catch (error) {
			throw error;
		}
	},

	borrar: async (id) => {
		try {
			return await Materia.destroy({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	},
};

export default materiaRepository;
