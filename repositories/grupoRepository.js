import { Clase, Grupo, Materia, Horario } from "../models/index.js";

const grupoRepository = {
	crear: async (grupo) => {
			const nuevoGrupo = await Grupo.create(grupo);
			return nuevoGrupo;
	},

	obtenerTodos: async () => {
		const grupos = await Grupo.findAll({
			include: [
				{
					model: Horario,
					include: [{
						model: Clase,
						attributes: ["dia", "horaInicio", "horaSalida", "leccion"],
						include: [{
							model: Materia,
							attributes: ["nombre"]
						}]
					}]
				}
			]
		});
	return grupos;
	},

	obetenerPorId: async (seccion) => {
		const grupo = await Grupo.findByPk(seccion, {
			include: [
				{
					model: Horario,
					include: [{
						model: Clase,
						attributes: ["dia", "horaInicio", "horaSalida", "leccion"],
						include: [{
							model: Materia,
							attributes: ["nombre"]
						}]
					}]
				}
			]
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
};

export default grupoRepository;
