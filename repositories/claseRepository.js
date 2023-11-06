import {
	Clase,
	Funcionario,
	Materia,
	Horario,
	Grupo,
	Estudiante,
} from "../models/index.js";

const claseRepository = {
	crear: async (clase) => {
		const nuevaClase = await Clase.create(clase);
		return nuevaClase;
	},

	obtenerTodos: async () => {
		const clases = await Clase.findAll({
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
		return clases;
	},

	obtenerPorId: async (id) => {
		const clase = await Clase.findByPk(id, {
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
		return clase;
	},

	actualizar: async (id, nuevosDatos) => {
		const clase = await Clase.findByPk(id);
		if (!clase) {
			return clase;
		}
		await clase.update(nuevosDatos);
		return clase;
	},

	borrar: async (id) => {
		const clase = await Clase.findByPk(id);
		if (!clase) {
			return clase;
		}
		return await clase.destroy();
	},

	estudiantesPorClase: async (id) => {
		const clases = await Clase.findAll({
			where: {
				funcionarioId: id,
			},
			include: [
				{
					model: Horario, // Incluye el modelo Horario
					include: [
						{
							model: Grupo,
							include: [
								{
									model: Estudiante,
									attributes: [
										"nombre",
										"apellido1",
										"apellido2",
									],
								},
							],
						},
					],
				},
			],
		});
		console.log(clases);
		return clases;
	},

	obtenerFuncionarioMateria: async (id) => {
		const clases = await Clase.findAll({
			where: {
				funcionarioId: id,
			},
			attributes: [],
			include: [
				{
					model: Materia,
				},
			],
		});
		try {
			// Utilizamos un conjunto para almacenar los identificadores únicos de las materias
			const materiasSet = new Set();

			// Usamos filter para eliminar los duplicados basados en el id de la materia
			const materiasUnicas = clases
				.filter((item) => {
					const id = item.materia.id;
					// Si el identificador de la materia no está en el conjunto, lo añadimos y devolvemos true
					if (!materiasSet.has(id)) {
						materiasSet.add(id);
						return true;
					}
					// Si el identificador de la materia ya está en el conjunto, devolvemos false
					return false;
				})
				.map((item) => ({
					id: item.materia.id,
					nombre: item.materia.nombre,
				}));

                return materiasUnicas;
		} catch (error) {
			console.log(error);
		}
	},
};

export default claseRepository;
