import encargadoService from "../services/encargadoServices.js";

const encargadoController = {
	//Obtener todo los encargados
	obtenerEncargados: async (req, res) => {
		try {
			const encargados = await encargadoService.obtenerTodosEncargados();
			res.status(200).json(encargados);
		} catch (error) {
			console.error("Error al obtener los encargados:", error);
			res.status(500).json({
				error: "Error al obtener los encargados",
				detalle: error.message,
			});
		}
	},

	//Crear un Encargado
	crearEncargado: async (req, res) => {
		try {
			const { id,nombre, apellido1, apellido2 } = req.body;

			const nuevoEncargado = await encargadoService.crearEncargado({
				id,
				nombre,
				apellido1,
				apellido2,
			});
			res.status(201).json(nuevoEncargado);
		} catch (errors) {
			res.status(400).json({ error: errors });
		}
	},

	//Encontrar encargado por id
	obtenerEncargado: async (req, res) => {
		const { id } = req.params;

		if (!id || isNaN(id)) {
			return res
				.status(400)
				.json({ error: "Faltan datos obligatorios [id]" });
		}

		try {
			const encargado = await encargadoService.obtenerEncargadoPorId(id);
			res.status(200).json(encargado);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	//Actualiazar un encargado
	actualizarEncargado: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, apellido1, apellido2 } = req.body;

			if (!id  || isNaN(id)|| !nombre || !apellido1 || !apellido2) {
				return res.status(400).json({error: "Faltan datos obligatorios",});
			}
		await encargadoService.actualizarEncargado(id, {
			nombre,
			apellido1,
			apellido2,
		});
		res.json({ message: "Encargado actualizado correctamente" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Eliminar un encargado
	eliminarEncargado: async (req, res) => {
		try {
			const { id } = req.params;

			if (!id || isNaN(id)) {
				return res.status(400).json({ error: "Faltan datos obligatorios[id], o formato incorrecto" });
			}

			await encargadoService.borrarEncargado(id);
			res.status(200).json({ message: "Encargado eliminado correctamente" });

		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},
};

export default encargadoController;
