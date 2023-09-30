import materiaService from "../services/materiaService.js";

const materiaController = {

	obtenerMaterias: async (req, res) => {
		try {
			const materia = await materiaService.obtenerTodasMateria();
			res.status(200).json(materia);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	crearMateria: async (req, res) => {
		try {
			const { nombre} = req.body;
			const nuevaMateria = await materiaService.crearMateria({
                nombre
			});

			res.status(201).json(nuevaMateria);
		} catch (error) {
			if (error.errors) {
				const erroresValidacion = error.errors.map(
					(err) => err.message,
				);
				res.status(400).json({ errores: erroresValidacion });
			} else {
				res.status(500).json({ error: "Error al crear la materia" });
			}
		}
	},

	obtenerMateriaPorId: async (req, res) => {
		try {
			const { id } = req.params;
			const materia = await materiaService.obtenerMateriaPorId(id);
			res.status(200).json(materia);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Modificar Nota
	actualizarMateria: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre } = req.body;

			const materia = await materiaService.actualizarMateria(id, {nombre});
			return res.status(200).json(materia);
		} catch (error) {
			console.error("Error al actualizar la materia:", error);
			return res
				.status(500)
				.json({ error: "Error interno del servidor." });
		}
	},

	//Eliminar Nota
	eliminarMateria: async (req, res) => {
		const { id } = req.params;
		try {
			const materia = materiaService.borrarMateria(id);
			if (!materia) {
				res.status(404).json({ error: "Materia no encontrada" });
			} else {
				await materiaService.borrarMateria(id);
				res.status(200).json({
					message: "Materia eliminada correctamente",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar la Materia" });
		}
	},
};

export default materiaController;
