import { Grupo } from "../models/index.js";

const grupoRepository = {
	crear: async (grupo) => {
			const nuevoGrupo = await Grupo.create(grupo);
			return nuevoGrupo;
	},

	obtenerTodos: async () => {
		try {
			return await Grupo.findAll();
		} catch (error) {
			throw error;
		}
	},

	obetenerPorId: async (seccion) => {
		try {
			const grupo = await Grupo.findByPk(seccion);
			if (!grupo) {
				throw new Error("Grupo no encontrado");
			}
			return grupo;
		} catch (error) {
			throw error;
		}
	},

	actualizar: async (seccion, nuevosDatos) => {
		try {
			const grupo = await Grupo.findByPk(seccion);
			if (!grupo) {
				throw new Error("Grupo no encontrado");
			}
			await grupo.update(nuevosDatos);
			return grupo;
		} catch (error) {
			throw error;
		}
	},

	borrar: async (seccion) => {
		try {
			return await Grupo.destroy({
				where: { seccion },
			});
		} catch (error) {
			throw error;
		}
	},
};

export default grupoRepository;
