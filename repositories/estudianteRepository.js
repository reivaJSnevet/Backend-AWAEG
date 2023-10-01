import { Clase, Estudiante } from "../models/index.js";
import Nota from "../models/Nota.js";
import Materia from "../models/Materia.js";


const estudianteRepository = {
	crear: async (estudianteData) => {
		try {
			return await Estudiante.create(estudianteData);
		} catch (error) {
			throw error;
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

	estudianteNotas: async (id) => {
		try {
			const estudiante = await Estudiante.findByPk(id, {
				include: [
					{
						model: Nota,
						attributes: ["id", "calificacion", "periodo"],
						include: [
							{
								model: Clase,
                                attributes: ["id"],
                                include: [
                                    {
                                        model: Materia,
                                        attributes: ["nombre"]
                                    }
                                ]
							},
						],
					},
				],
			});

			if (!estudiante) {
				throw new Error("Estudiante no encontrado");
			}

			return estudiante;
		} catch (error) {
			throw error;
		}
	},
};

export default estudianteRepository;
