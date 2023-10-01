import estudianteService from "../services/estudianteService.js";

const estudianteController = {
	createEstudiante: async (req, res) => {
		try {
			const {
				id,
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				direccion,
				usuarioId,
				encargadoId,
				seccion
			} = req.body;

			const nuevoEstudiante = await estudianteService.crearEstudiante({
				id,
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				direccion,
				usuarioId,
				encargadoId,
				seccion
			});

			res.status(201).json(nuevoEstudiante);
		} catch (error) {
			res.status(500).json({ error: "Error al crear el estudiante" });
			console.log(error);
		}
	},

	getAllEstudiantes: async (req, res) => {
		try {
			const estudiantes =
				await estudianteService.obtenerTodosEstudiante();
			res.status(200).json(estudiantes);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	getEstudianteById: async (req, res) => {
		try {
			const { id} = req.params;
            const {mostrarNotas} = req.body;
            
			const estudiante =
				await estudianteService.obtenerEstudiantelPorId(id, mostrarNotas);
			res.status(200).json(estudiante);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	updateEstudianteById: async (req, res) => {
		try {
			const { id } = req.params;
			const {
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				direccion,
			} = req.body;
			const datos = {
				nombre,
				apellido1,
				apellido2,
				fechaNacimiento,
				sexo,
				direccion,
			};

			const estudiante = await estudianteService.actualizarEstudiante(
				id,
				datos,
			);
			return res.status(200).json(estudiante);
		} catch (error) {
			console.error("Error al actualizar estudiante:", error);
			return res
				.status(500)
				.json({ error: "Error interno del servidor." });
		}
	},

	// Eliminar un rol por ID
	deleteEstudianteById: async (req, res) => {
		const { id } = req.params;
		try {
			const estudiante = await estudianteService.obtenerEstudiantelPorId(id);

			if (!estudiante) {
				res.status(404).json({ error: "Estudiante no encontrado" });
			} else {
				await estudianteService.borrarEstudiante(id);
				res.status(200).json({
					message: "Estudiante eliminado correctamente",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar el estudiante" });
		}
	},
};

export default estudianteController;
