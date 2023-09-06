import horarioService from "../services/horarioServices.js";

const horarioController = {
	// Obtener todos los horarios
	obtenerHorarios: async (req, res) => {
		try {
			const horarios = await horarioService.obtenerTodosHorarios();
			res.status(200).json(horarios);
		} catch (error) {
			res.status(500).json({ error: error.message });
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
		} catch (error) {
			if (error.errors) {
				const erroresValidacion = error.errors.map(
					(err) => err.message,
				);
				res.status(400).json({ errores: erroresValidacion });
			} else {
				res.status(500).json({ error: "Error al crear el horario" });
			}
		}
	},

	//encontrar horario por id
	obtenerHorario: async (req, res) => {
		try {
			const { id } = req.params;
			const horario =
				await horarioService.obtenerHorarioPorId(id);
			res.status(200).json(horario);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Actualizar un horario

	actualizarHorario: async (req, res) => {
		try {
			const { id } = req.params;
			const { provisional, habilitado } = req.body;
			const datos = { provisional, habilitado };

			const horario = await horarioService.actualizarHorario(
				id,
				datos,
			);
			return res.status(200).json(horario);
		} catch (error) {
			console.error("Error al actualizar el horario:", error);
			return res
				.status(500)
				.json({ error: "Error interno del servidor." });
		}
	},

	//eliminar Horario

	eliminarHorario: async (req, res) => {
		const { id } = req.params;
		try {
			const horario = await horarioService.obtenerHorarioPorId(id);

			if (!horario) {
				res.status(404).json({ error: "Horario no encontrado" });
			} else {
				await horarioService.borrarHorario(id);
				res.status(200).json({
					message: "Horario eliminado correctamente",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar el horario" });
		}
	}

}

export default horarioController;