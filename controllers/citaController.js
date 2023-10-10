import citaService from "../services/citaService.js";

const citaController = {

    crearCita: async (req, res) => {
		try {
			const { dia, asunto, duracion, ubicacion, funcionarioId } = req.body;

			if (!dia || !asunto || !duracion || !ubicacion || isNaN(funcionarioId)) {
				return res
					.status(400)
					.json({ error: "Faltan datos obligatorios, o formato incorrecto" });
			}

			const nuevaCita = await citaService.crearCita({
                dia,
                asunto,
                duracion,
                ubicacion,
                funcionarioId,
			});
			res.status(201).json(nuevaCita);
		} catch (errors) {
			res.status(400).json({ error: errors });
		}
	},

    obtenerCitas: async (req, res) => {
        try {
            const citas = await citaService.obtenerCitas();
            res.status(200).json(citas);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener las citas",
                detalle: error.message,
            });
        }
    },

    obtenerCitaPorId: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res
                .status(400)
                .json({ error: "Faltan datos obligatorios, o formato incorrecto" });
        }

        try {
            const cita = await citaService.obtenerCitaPorId(id);
            res.status(200).json(cita);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    actualizarCita: async (req, res) => {
        const { id } = req.params;
        const nuevosDatos = req.body;

        if (!id || isNaN(id)) {
            return res
                .status(400)
                .json({ error: "Faltan datos obligatorios, o formato incorrecto" });
        }

        try {
            const cita = await citaService.actualizarCita(id, nuevosDatos);
            res.status(200).json(cita);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    borrarCita: async (req, res) => {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res
                .status(400)
                .json({ error: "Faltan datos obligatorios, o formato incorrecto" });
        }

        try {
            const cita = await citaService.borrarCita(id);
            res.status(200).json(cita);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    

}

export default citaController;