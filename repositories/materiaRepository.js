import { Materia } from "../models/index.js";

const materiaRepository = {
	crear: async (materia) => {
        const nuevaMateria = await Materia.create(materia);
		return nuevaMateria;
	},

	obtenerTodos: async () => {
        const materias = await Materia.findAll();
		return materias;
	},

	obetenerPorId: async (id) => {
		const materia = await Materia.findByPk(id);
		return materia;
	},

	actualizar: async (id, nuevosDatos) => {
        const materia = await Materia.findByPk(id);
        if(!materia){
            return materia;
        } 
        await materia.update(nuevosDatos);
        return materia;
	},

	borrar: async (id) => {
        const materia = await Materia.findByPk(id);
        if(!materia){
            return materia;
        }
        return await materia.destroy();
	},
};

export default materiaRepository;
