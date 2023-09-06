import { Estudiante } from "../models/index.js";
/* import GenericRepository from "./genericRepository.js"; */

//posible implementacion de genericRepositoty
/* const estudianteRepo = new GenericRepository(Estudiante) */

const estudianteRepository = {
	crear: async (estudianteData) => {
		try {
			return await Estudiante.create(estudianteData);
		} catch (error) {
			throw error; // Propaga el error para que sea manejado en los controladores
		}
	},

	obtenerTodos: async () => {
		try {
			return await Estudiante.findAll();
		} catch (error) {
			throw error;
		}
	},

	obtenerPorId: async (id) => {
		try {
			const estudiante = await Estudiante.findByPk(id);
			if (!estudiante) {
				throw new Error("Estudiante no encontrado");
			}
			return estudiante;
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (id, nuevosDatos) => {
		try {
			const estudiante = await Estudiante.findByPk(id);
			if (!estudiante) {
				throw new Error("Estudiante no encontrado");
			}
			await estudiante.update(nuevosDatos);
			return estudiante;
		} catch (error) {
			throw error;
		}
	},

	borrar: async (id) => {
		try {
			return await Estudiante.destroy({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	},
};

export default estudianteRepository;
