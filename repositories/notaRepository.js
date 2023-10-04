import { Nota, Clase, Materia} from "../models/index.js";

const notaRepository = {
	crear: async (nota) => {
		const nuevaNota = await Nota.create(nota);
		return nuevaNota;
	},

	obtenerTodos: async () => {
		const notas = await Nota.findAll();
		return notas;
	},

	obetenerPorId: async (id) => {
		const nota = await Nota.findAll({
            where: {
                estudianteId: id,
            },
            attributes: ["id", "calificacion", "periodo", "createdAt", "updatedAt", "funcionarioId", ],
            include: [
                {
                    model: Clase,
                    attributes: ["id"],
                    include: [
                        {
                            model: Materia,
                            attributes: ["nombre"],
                        },
                    ],
                },
            ],
        });
		return nota;
	},

	actualizar: async (id, nuevosDatos) => {
		const nota = await Nota.findByPk(id);
		if (!nota) {
			return nota;
		}
		await nota.update(nuevosDatos);
		return nota;
	},

	borrar: async (id) => {
		const nota = await Nota.findByPk(id);
		if (!nota) {
			return nota;
		}
		await nota.destroy();
		return nota;
	},
};

export default notaRepository;
