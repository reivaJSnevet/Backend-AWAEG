import { Clase, Funcionario, Materia } from "../models/index.js";

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
            return await Clase.findAll({
                include: [
                    {
                        model: Funcionario,
                        attributes: ["nombre", "apellido1", "apellido2"],
                    },
                    {
                        model: Materia,
                        attributes: ["nombre"],
                    },
                ],
            });
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
			return await Clase.destroy({
				where: { id },
			});
		} catch (error) {
			throw error;
		}
	},
};

export default claseRepository;
