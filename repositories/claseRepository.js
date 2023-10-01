import { Clase, Funcionario, Materia } from "../models/index.js";

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
};

export default claseRepository;
