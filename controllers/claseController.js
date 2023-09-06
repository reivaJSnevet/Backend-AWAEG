import claseService from "../services/claseServices.js";

const claseController = {
	crearClase: async (req, res) => {
		const { dia, horaInicio, horaSalida, leccion } = req.body;

		if (!dia || !horaInicio || !horaSalida || !leccion) {
			return res.status(400).json({ error: "Faltan datos obligatorios" });
		}

		try {
			const nuevaClase = await claseService.crearClase({
				dia,
				horaInicio,
				horaSalida,
				leccion,
			});
			res.status(201).json(nuevaClase);
		} catch (error) {
			console.error("Error al crear la clase:", error);
			res.status(500).json({
				error: "Error al crear la clase",
				detalle: error.message,
			});
		}
	},

	getAllClase: async (req, res) => {
		try {
			const clases = await claseService.obtenerClases();
			res.status(200).json(clases);
		} catch (error) {
			console.error("Error al obtener las clases:", error);
			res.status(500).json({
				error: "Error al obtener las clases",
				detalle: error.message,
			});
		}
	},

	getClaseById: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ error: "Faltan datos obligatorios" });
		}

		try {
			const clase = await claseService.obtenerClasePorId(id);

			console.log("ESTE ES EL CLASEE: ", clase);

			if (!clase) {
				res.status(404).json({ error: "clase no encontrada" });
			} else {
				res.status(200).json(clase);
			}
		} catch (error) {
			res.status(500).json({ error: "Error al obtener la clase" });
		}
	},

	updateClaseById: async (req, res) => {
		const { id } = req.params;
		const { dia, horaInicio, horaSalida, leccion } = req.body;

		if (!id || !dia || !horaInicio || !horaSalida || !leccion) {
			return res.status(400).json({ error: "Faltan datos obligatorios" });
		}

		try {
			await claseService.actualizarClase(id, {
				dia,
				horaInicio,
				horaSalida,
				leccion,
			});
			res.json({ message: "Clase actualizada correctamente" });
		} catch (error) {
			res.status(500).json({ error: "Error al actualizar la clase" });
		}
	},

	deleteClaseById: async (req, res) => {
		const { id } = req.params;
		try {
			const clase = await claseService.obtenerClasePorId(id);

			if (!clase) {
				res.status(404).json({ error: "Clase no encontrada" });
			} else {
				await claseService.borrarClase(id);
				res.status(200).json({
					message: "Clase eliminada correctamente",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar la clase" });
		}
	},
};

export default claseController;
