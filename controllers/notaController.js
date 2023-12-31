import notaService from "../services/notaServices.js";

const notaController = {
	//Crear Nota
	crearNota: async (req, res) => {
		try {
			const notas = req.body;
            
            /* if(!periodo || isNaN(calificacion) || isNaN(funcionarioId) || isNaN(materiaId) || isNaN(estudianteId)){
                return res.status(400).json({error: "Faltan datos obligatorios o tienen formato incorrecto"});
            } */

			const nuevasNotas = await notaService.crearNota(notas);

			return res.status(201).json(nuevasNotas);

		} catch (error) {
            res.status(500).json({ error: error });
        }
	},

	//Obtener todas las notas
	obtenerNotas: async (req, res) => {
		try {
			const notas = await notaService.obtenerTodasNotas();
			res.status(200).json(notas);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Obtener nota por Id
	obtenerNotaPorId: async (req, res) => {
		try {
			const { id } = req.params;

            if(!id || isNaN(id)){
                return res.status(400).json({error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

			const nota = await notaService.obtenerNotaPorId(id);
			res.status(200).json(nota);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	//Modificar Nota
	actualizarNota: async (req, res) => {
		try {
			const { id } = req.params;
            const { calificacion, periodo, funcionarioId, estudianteId, materiaId } = req.body;

            if(isNaN(id) || !periodo || isNaN(calificacion) || isNaN(funcionarioId) || isNaN(materiaId) || isNaN(estudianteId)){
                return res.status(400).json({error: "Faltan datos obligatorios o tienen formato incorrecto"});
            }

			await notaService.actualizarNota(id, { calificacion, periodo, funcionarioId, estudianteId, materiaId });
			return res.status(200).json({ message: "Nota actualizada correctamente" });
		} catch (error) {
			return res
				.status(404)
				.json({ error: error.message });
		}
	},

	//Eliminar Nota
	eliminarNota: async (req, res) => {
		try {
            const { id } = req.params;
            
            if(!id || isNaN(id)){
                return res.status(400).json({error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

            await notaService.borrarNota(id);
            return res.status(200).json({ message: "Nota eliminada correctamente" });

		} catch (error) {
			res.status(404).json({ error: error.message }); 
		}
	},

    obtenerClases: async (req, res) => {
        try {
            const { id } = req.params;

            if(!id || isNaN(id)){
                return res.status(400).json({error: "Faltan datos obligatorios [id], o formato incorrecto" });
            }

            const clases = await notaService.obtenerClases(id);
            res.status(200).json(clases);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }

    }
};

export default notaController;
