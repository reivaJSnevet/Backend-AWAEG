import encargadoService from "../services/encargadoServices.js";

const encargadoController = {
	//Obtener todo los encargados
	obtenerEncargados: async (req, res) => {
		try {
			const encargados = await encargadoService.obtenerTodosEncargados();
			res.status(200).json(encargados);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Crear un Encargado
	crearEncargado: async (req, res) => {
		try {
			const { id, nombre, apellido1, apellido2 } = req.body;

			const nuevoEncargado = await encargadoService.crearEncargado({
				id,
				nombre,
				apellido1,
				apellido2,
			});

			res.status(201).json(nuevoEncargado);
		} catch (error) {
			if (error.errors) {
				const erroresValidacion = error.errors.map(
					(err) => err.message,
				);
				res.status(400).json({ errores: erroresValidacion });
			} else {
				res.status(500).json({ error: "Error al crear el encargado" });
			}
		}
	},

	//Encontrar encargado por id
	obtenerEncargado: async (req, res) => {
		try {
			const { id } = req.params;
			const encargado = await encargadoService.obtenerEncargadoPorId(id);
			res.status(200).json(encargado);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Actualiazar un encargado
	actualizarEncargado: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, apellido1, apellido2 } = req.body;
			const datos = { nombre, apellido1, apellido2 };

			const encargado = await encargadoService.actualizarEncargado(
				id,
				datos,
			);
			return res.status(200).json(encargado);
		} catch (error) {
			console.error("Error al actualizar el encargado:", error);
			return res
				.status(500)
				.json({ error: "Error interno del servidor." });
		}
	},

	//Eliminar un encargado
	eliminarEncargado: async (req, res) => {
		const { id } = req.params;
		try {
			const encargado = await encargadoService.obtenerEncargadoPorId(id);

			if (!encargado) {
				res.status(404).json({ error: "Encargado no encontrado" });
			} else {
				await encargadoService.borrarEncargado(id);
				res.status(200).json({
					message: "Encargado eliminado correctamente",
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Error al eliminar el encargado" });
		}
	},
};

export default encargadoController;
