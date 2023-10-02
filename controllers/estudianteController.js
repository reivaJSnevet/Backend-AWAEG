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

			if(!usuarioId || !encargadoId || !seccion){
				return res.status(400).json({ error: "Faltan datos obligatorios" });
			}

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
		} catch (errors) {
			res.status(400).json({ error: errors });
		}
	},

	getAllEstudiantes: async (req, res) => {
		try {
			const estudiantes = await estudianteService.obtenerTodosEstudiante();
			res.status(200).json(estudiantes);
		} catch (error) {
			console.error("Error al obtener los estudiantes:", error);
			res.status(500).json({
				error: "Error al obtener los estudiantes",
				detalle: error.message,
			});
		}
	},

	getEstudianteById: async (req, res) => {
		const { id } = req.params;
        const {mostrarNotas} = req.body;

		if (!id || isNaN(id)) {
			return res
				.status(400)
				.json({ error: "Faltan datos obligatorios [id]" });
		}

		try {
			const estudiante = await estudianteService.obtenerEstudiantelPorId(id, mostrarNotas);
			res.status(200).json(estudiante);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	updateEstudianteById: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, apellido1, apellido2, fechaNacimiento, sexo, direccion, usuarioId, encargadoId, seccion} = req.body;

			if (!id || isNaN(id) || !nombre || !apellido1 || !apellido2 || !fechaNacimiento || !sexo || !direccion || !usuarioId || !encargadoId || !seccion) {
				return res.status(400).json({error: "Faltan datos obligatorios",});
			}
		await estudianteService.actualizarEstudiante(id, {
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
		res.status(200).json({ message: "Estudiante actualizado correctamente" });
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	// Eliminar un rol por ID
	deleteEstudianteById: async (req, res) => {
		try {
			const { id } = req.params;

			if (!id || isNaN(id)) {
				return res
					.status(400)
					.json({ error: "Faltan datos obligatorios [id]" });
			}

			await estudianteService.borrarEstudiante(id);
			res.status(200).json({ message: "Estudiante eliminado correctamente" });
		} catch (error) {
			res.status(404).json({ error: error.message });
		}	
	},
};

export default estudianteController;
