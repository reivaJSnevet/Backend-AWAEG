import { Clase, Encargado, Estudiante, Grupo, Usuario } from "../models/index.js";
import Nota from "../models/Nota.js";
import Materia from "../models/Materia.js";


const estudianteRepository = {
	crear: async (estudiante) => {
		const nuevoEstudiante = await Estudiante.create(estudiante);
		return nuevoEstudiante;
	},

	obtenerTodos: async () => {
		const estudiantes = await Estudiante.findAll({
			include: [
				{
					model: Usuario,
					attributes: ["nombre", "correo"],
				},
				{
					model: Grupo,
					attributes: ["seccion", "aula","ciclo", "turno"]
				},
				{
					model: Encargado,
					attributes: ["id", "nombre", "apellido1", "apellido2"]
				},
				{
					model: Nota,
					attributes: ["id", "calificacion", "periodo"],
					include: [{
						model: Clase,
						attributes: ["id"],
						include: [{
							model: Materia,
							attributes: ["nombre"]
						}]
					}]
				}
				
			],
		});
		return estudiantes;
	},

	obtenerPorId: async (id) => {
		const estudiante = await Estudiante.findByPk(id, {
			include: [
				{
					model: Usuario,
					attributes: ["nombre", "correo"],
				},
				{
					model: Grupo,
					attributes: ["seccion", "aula","ciclo", "turno"]
				},
				{
					model: Encargado,
					attributes: ["id", "nombre", "apellido1", "apellido2"]
				},
				{
					model: Nota,
					attributes: ["id", "calificacion", "periodo"],
					include: [{
						model: Clase,
						attributes: ["id"],
						include: [{
							model: Materia,
							attributes: ["nombre"]
						}]
					}]
				}
			]
		});
		return estudiante;
	},

	actualizar: async (id, nuevosDatos) => {
		const estudiante = await Estudiante.findByPk(id);
		if (!estudiante) {
			return estudiante;
		}
		await estudiante.update(nuevosDatos);
		return estudiante;
	},

	borrar: async (id) => {
		const estudiante = await Estudiante.findByPk(id);
		if (!estudiante) {
			return estudiante;
		}
		return await estudiante.destroy();
	},

	// estudianteNotas: async (id) => {
	// 	try {
	// 		const estudiante = await Estudiante.findByPk(id, {
	// 			include: [
	// 				{
	// 					model: Nota,
	// 					attributes: ["id", "calificacion", "periodo"],
	// 					include: [
	// 						{
	// 							model: Clase,
    //                             attributes: ["id"],
    //                             include: [
    //                                 {
    //                                     model: Materia,
    //                                     attributes: ["nombre"]
    //                                 }
    //                             ]
	// 						},
	// 					],
	// 				},
	// 			],
	// 		});

	// 		if (!estudiante) {
	// 			throw new Error("Estudiante no encontrado");
	// 		}

	// 		return estudiante;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// },
};

export default estudianteRepository;
