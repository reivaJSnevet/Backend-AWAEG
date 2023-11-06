import claseService from "../services/claseServices.js";

const claseController = {
	//dejar por fuera con decoradores
	crearClase: async (req, res) => {
		try {
			const {
				dia,
				horaInicio,
				horaSalida,
				leccion,
				materiaId,
				funcionarioId,
			} = req.body;

			if (!funcionarioId || !materiaId || isNaN(funcionarioId) || isNaN(materiaId)) {
				return res
					.status(400)
					.json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
			}

			const nuevaClase = await claseService.crearClase({
				dia,
				horaInicio,
				horaSalida,
				leccion,
				materiaId,
				funcionarioId,
			});
			res.status(201).json(nuevaClase);
		} catch (errors) {
			res.status(400).json({ error: errors });
		}
	},

	getAllClase: async (req, res) => {
		try {
			const clases = await claseService.obtenerClases();
			res.status(200).json(clases);
		} catch (error) {
			res.status(500).json({
				error: "Error al obtener las clases",
				detalle: error.message,
			});
		}
	},
	getClaseById: async (req, res) => {
		const { id } = req.params;

		if (!id|| isNaN(id) ) {
			return res
				.status(400)
				.json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
		}

		try {
			const clase = await claseService.obtenerClasePorId(id);
			res.status(200).json(clase);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	updateClaseById: async (req, res) => {
		try {
            const { id } = req.params;
		    const { dia, horaInicio, horaSalida, leccion, materiaId,funcionarioId } = req.body;

		    if (!id || isNaN(id) || !dia || !horaInicio || !horaSalida || !leccion || !funcionarioId || !materiaId){
			    return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
		    }
		
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
			res.status(404).json({ error: error.message });
		}
	},

	deleteClaseById: async (req, res) => {
		try {
            const { id } = req.params;
		
            if (!id || isNaN(id) ){
			    return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
		    }

			await claseService.borrarClase(id);
            res.status(200).json({ message: "Clase eliminada correctamente" });

		} catch (error) {
			res.status(404).json({ error: error.message});
		}
	},


    estudaintesPorClase: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id || isNaN(id) ){
                return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

            const estudiantes = await claseService.estudiantesPorClase(id);
            res.status(200).json(estudiantes);
        } catch (error) {
            res.status(404).json({ error: error.message});
        }
    },


	funcionarioMateria: async (req, res) => {
		try{
			const { id } = req.params;

			if (!id || isNaN(id) ){
				return res.status(400).json({ error: "Faltan datos obligatorios [id], o formato incorrecto" });
			}

			const materias = await claseService.obtenerFuncionarioMateria(id);
			res.status(200).json(materias);
		} catch {
			res.status(404).json({ error: error.message});
		}
	}
};

export default claseController;
