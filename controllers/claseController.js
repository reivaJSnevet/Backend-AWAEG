import claseService from "../services/claseServices.js";

const claseController = {

    //dejar por fuera con decoradores
	crearClase: async (req, res) => {
		const { dia, horaInicio, horaSalida, leccion, materiaId, funcionarioId} = req.body;
        console.log({ dia, horaInicio, horaSalida, leccion, materiaId, funcionarioId}, "AQUIIIIIESTAAAAA EL PROBLEMA ES BACKEND");

		if (!dia || !horaInicio || !horaSalida || !leccion || !funcionarioId || !materiaId) {
			return res.status(400).json({ error: "Faltan datos obligatorios" });
		}

		try {
			const nuevaClase = await claseService.crearClase({
				dia,
                horaInicio,
                horaSalida,
                leccion,
                materiaId,
                funcionarioId,
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
		const { funcionarioId, materiaId, leccion, horaInicio, horaSalida} = req.body;

		if (!id || !dia || !horaInicio || !horaSalida || !leccion || !funcionarioId || !materiaId) {
            console.log("Faltan datos obligatorios AQUIE ESTA EL PROBLEMA ES BACKEND");
			return res.status(400).json({ error: "Faltan datos obligatorios" });
		}

		try {
			await claseService.actualizarClase(id, {
				dia,
                horaInicio,
                horaSalida,
                leccion,
                materiaId,
                funcionarioId,
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
