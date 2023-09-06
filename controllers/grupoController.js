import grupoService from "../services/grupoServices.js";

const grupoController = {
	// Obtener todos los grupos
	obtenerGrupos: async (req, res) => {
		try {
			const grupos = await grupoService.obtenerTodosGrupos();
			res.status(200).json(grupos);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Crear un nuevo grupo
	crearGrupo: async (req, res) => {
		try {
			const {
				seccion,
				ciclo,
				grado,
				aula,
				cantAlumno,
				turno,
				horarioId,
				ProfesorGuia,
			} = req.body;

			const nuevoGrupo = await grupoService.crearGrupo({
				seccion,
				ciclo,
				grado,
				aula,
				cantAlumno,
				turno,
				horarioId,
				ProfesorGuia,
			});
			res.status(201).json(nuevoGrupo);
		} catch (error) {
			if (error.errors) {
				const erroresValidacion = error.errors.map(
					(err) => err.message,
				);
				res.status(400).json({ errores: erroresValidacion });
			} else {
				res.status(500).json({
					error: "Error al crear el Grupo",
				});
			}
		}
	},

	//encontrar grupo por seccion
	obtenerGrupo: async (req, res) => {
		try {
			const { seccion } = req.params;
			const grupo = await grupoService.actualizarGrupo(seccion);
			res.status(200).json(grupo);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Actualizar un grupo

	actualizarGrupo: async (req, res) => {
		try {
			const { seccion } = req.params;
			const { ciclo, grado, aula, cantAlumno, turno, horarioId, ProfesorGuia } = req.body;
			const datos = { ciclo, grado, aula, cantAlumno, turno, horarioId, ProfesorGuia };

			const grupo = await grupoService.actualizarGrupo(seccion, datos);
			return res.status(200).json(grupo);
		} catch (error) {
			console.error("Error al actualizar el grupo:", error);
			return res
				.status(500)
				.json({ error: "Error interno del servidor." });
		}
	},

	//eliminar Grupo

	eliminarGrupo: async (req, res) => {
		const { seccion } = req.params;
		try {
			const grupo = grupoService.obtenerGrupoPorId(seccion);
			if (!grupo) {
				res.status(404).json({ error: "Grupo no encontrado" });
			} else {
				await grupoService.borrarGrupo(seccion);
				res.status(200).json({ message: "Grupo eliminado con exito" });
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar el Grupo" });
		}
	},
};

export default grupoController;
