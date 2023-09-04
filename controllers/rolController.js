import rolService from "../services/rolService.js";

const rolController = {
	// Crear un nuevo rol
	crearRol: async (req, res) => {
		try {
			const { nombre, nivelPrivilegio, descripcion } = req.body;
			const nuevoRol = await rolService.crearRol({
				nombre,
				nivelPrivilegio,
				descripcion,
			});
			res.status(201).json(nuevoRol);
		} catch (error) {
			res.status(500).json({ error: "Error al crear el rol" });
			console.log(error);
		}
	},

	// Obtener todos los roles
	getAllRoles: async (req, res) => {
		try {
			const roles = await rolService.obtenerTodosRol();
			res.status(200).json(roles);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener los roles" });
		}
	},

	// Obtener un rol por ID
	getRolById: async (req, res) => {
		try {
			const { id } = req.params;
			const rol = await rolService.obtenerRolPorId(id);

			if (!rol) {
				res.status(404).json({ error: "Rol no encontrado" });
			} else {
				res.status(200).json(rol);
			}
		} catch (error) {
			res.status(500).json({ error: "Error al obtener el rol" });
		}
	},

	// Actualizar un rol por ID
	updateRolById: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, nivelPrivilegio, descripcion } = req.body;

			await rolService.actualizarRol(id, {
				nombre,
				nivelPrivilegio,
				descripcion,
			});
			res.json({ message: "Rol actualizado correctamente" });
		} catch (error) {
			res.status(500).json({ error: "Error al actualizar el rol" });
		}
	},

	// Eliminar un rol por ID
	deleteRolById: async (req, res) => {
		try {
			const { id } = req.params;
			await rolService.borrarRol(id);
			res.json({ message: "Rol borrado correctamente" });
		} catch (error) {
			res.status(500).json({ error: "Error al borrar el rol" });
		}
	},
};

export default rolController;
