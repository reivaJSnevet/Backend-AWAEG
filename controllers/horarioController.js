import horarioService from "../services/horarioServices.js";

const horarioController = {
	// Obtener todos los horarios
	obtenerHorarios: async (req, res) => {
		try {
			const horarios = await horarioService.obtenerTodosHorarios();
			res.status(200).json(horarios);
		} catch (error) {
			console.error("Error al obtener los horarios:", error);
			res.status(500).json({
				error: "Error al obtener los horarios",
				detalle: error.message,
			});
		}
	},

	// Crear un nuevo grupo
	crearHorario: async (req, res) => {
		try {
			const { provisional, habilitado } = req.body;
			const nuevoHorario = await horarioService.crearHorario({
				provisional,
				habilitado,
			});

			res.status(201).json(nuevoHorario);
		} catch (errors) {
			res.status(400).json({ error: errors });
		}
	},

	//encontrar horario por id
	obtenerHorario: async (req, res) => {
		const { id } = req.params;
		if (!id) {
			return res
				.status(400)
				.json({ error: "Faltan datos obligatorios [id]" });
		}

		try {
			const horario = await horarioService.obtenerHorarioPorId(id);
			res.status(200).json(horario);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	//Actualizar un horario

	actualizarHorario: async (req, res) => {
		try {
			const { id } = req.params;
			const { provisional, habilitado } = req.body;

			await horarioService.actualizarHorario(id, {
				provisional,
				habilitado,
			});
			res.json({ message: "Horario actualizado correctamente" });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	//eliminar Horario

	eliminarHorario: async (req, res) => {
		try {
			const { id } = req.params;
			await horarioService.borrarHorario(id);
			res.status(200).json({ message: "Horario eliminado correctamente" });

		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

}

export default horarioController;