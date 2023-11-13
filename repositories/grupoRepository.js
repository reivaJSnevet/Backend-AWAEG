import {
	Clase,
	Grupo,
	Materia,
	Horario,
	Estudiante,
	Funcionario,
} from "../models/index.js";
import db from "../config/db.js";
import sequelize from "sequelize";

const grupoRepository = {
	crear: async (grupo) => {
		const nuevoGrupo = await Grupo.create(grupo);
		return nuevoGrupo;
	},

	obtenerTodos: async () => {
		try {
			const grupos = await Grupo.findAll({
				include: [Estudiante, Funcionario],
			});

			return grupos;
		} catch (error) {
			console.error("Error al obtener grupos con estudiantes:", error);
			throw error;
		}

		/* const grupos = await Grupo.findAll({
			include: [
				{
					model: Horario,
					include: [
						{
							model: Clase,
							attributes: [
								"dia",
								"horaInicio",
								"horaSalida",
								"leccion",
							],
							include: [
								{
									model: Materia,
									attributes: ["nombre"],
								},
							],
						},
					],
				},
			],
		}); */
	},

	obtenerPorId: async (seccion) => {
		const grupo = await Grupo.findByPk(seccion, {
			include: [
				{
					model: Estudiante,
				},
				{
					model: Funcionario,
				},
				{
					model: Horario,
					include: [
						{
							model: Clase,
							attributes: [
								"id",
								"dia",
								"horaInicio",
								"horaSalida",
								"leccion",
							],
							include: [
								{
									model: Materia,
									attributes: ["nombre"],
								},
							],
						},
					],
				},
			],
		});
		return grupo;
	},

	actualizar: async (seccion, nuevosDatos) => {
		const grupo = await Grupo.findByPk(seccion);
		if (!grupo) {
			return grupo;
		}
		await grupo.update(nuevosDatos);
		return grupo;
	},

	borrar: async (seccion) => {
		const grupo = await Grupo.findByPk(seccion);
		if (!grupo) {
			return grupo;
		}
		return await grupo.destroy();
	},

	obtenerGruposConClasesPorFuncionario: async (funcionarioId) => {
		const result = await db.query(
			"CALL ObtenerGruposConClasesPorFuncionario(:funcionarioId)",
			{
				replacements: { funcionarioId: funcionarioId },
				type: sequelize.QueryTypes.RAW,
			},
		);
		return result;
	},
};

export default grupoRepository;
