import horarioServices from "../services/horarioServices.js";

const horarioController = {
	// Obtener todos los horarios
	obtenerHorarios: async (req, res) => {
		try {
			const horarios = await horarioServices.obtenerTodosHorarios();
			res.status(200).json(horarios);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener los Horarios" });
		}
	},

	// Crear un nuevo grupo
	crearHorario: async (req, res) => {
		try {
			const { provisional, habilitado } = req.body;
			const nuevoHorario = await horarioServices.crearHorario({
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
			const { idHorario } = req.params;
			const horario = await horarioServices.actualizarHorario(idHorario);
			res.status(200).json(horario);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Actualizar un horario

	actualizarHorario: async (req, res) => {
		try {
			const { idHorario } = req.params;
			const { provisional, habilitado } = req.body;
			const datos = { provisional, habilitado };

			const horario = await horarioServices.actualizarHorario(
				idHorario,
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
		const { idHorario } = req.params;
		try {
			const horario = horarioServices.obtenerHorarioPorId(idHorario);
			if (!horario) {
				res.status(404).json({ error: "horario no encontrado" });
			} else {
				await horarioServices.borrarHorario(idHorario);
				res.status(200).json({
					message: "horario eliminado con exito",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar el Horario" });
		}
	},
};

export default horarioController;
