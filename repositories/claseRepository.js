import { Clase } from "../models/index.js";

const claseRepository = {
	crear: async (clase) => {
		try {
			return await Clase.create(clase);
		} catch (error) {
			throw error;
		}
	},

	obtenerTodos: async () => {
		try {
			return await Clase.findAll();
		} catch (error) {
			throw error;
		}
	},

	obtenerPorId: async (id) => {
		try {
			const clase = await Clase.findByPk(id);
			return clase;
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (id, nuevosDatos) => {
		try {
			const clase = await Clase.findByPk(id);
			if (!clase) {
				throw new Error("Clase no encontrada");
			}
			await clase.update(nuevosDatos);
			return clase;
		} catch (error) {
			throw error;
		}
	},

	borrar: async (id) => {
		try {
			const clase = await Clase.findByPk(id);
			if (!clase) {
				throw new Error("Clase no encontrada");
			}
			return await clase.destroy(); //Probar Luego AQUI POSIBLE ERROR
		} catch (error) {
			throw error;
		}
	},
};

export default claseRepository;
