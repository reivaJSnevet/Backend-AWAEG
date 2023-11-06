import { Nota, Clase, Materia} from "../models/index.js";

const notaRepository = {
	crear: async (nota) => {
        try{
		const nuevaNota = await Nota.bulkCreate(nota);
		return nuevaNota;
        }catch(error){
            console.log(error);
        }
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
                    model: Materia
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

    obtenerClases: async (id) => {
        const clases = await Clase.findAll({
            where: {
                funcionarioId: id,
            },
            include:[
                {
                    model: Materia,
                    attributes: ["nombre"],
                },
            ]
            
        });
        return clases;
    }
};

export default notaRepository;
