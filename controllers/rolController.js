import e from "express";
import rolService from "../services/rolService.js";

const rolController = {
	// Crear un nuevo rol
	crearRol: async (req, res) => {
		try {
			const { nombre, nivelPrivilegio, descripcion } = req.body;

            if(!nombre || !nivelPrivilegio || !descripcion || isNaN(nivelPrivilegio)){
                return res.status(400).json({error: "Faltan datos o los datos son incorrectos"})
            }

			const nuevoRol = await rolService.crearRol({
				nombre,
				nivelPrivilegio,
				descripcion,
			});
			res.status(201).json(nuevoRol);
		} catch (error) {
			res.status(400).json({ error});
		}
	},

	// Obtener todos los roles
	getAllRoles: async (req, res) => {
		try {
			const roles = await rolService.obtenerTodosRol();
			res.status(200).json(roles);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener los roles", detalle: error.message });
		}
	},

	// Obtener un rol por ID
	getRolById: async (req, res) => {
		try {
			const { id } = req.params;

            if(isNaN(id)){
                return res.status(400).json({error: "faltan datos o los datos son incorrectos"})
            }

			const rol = await rolService.obtenerRolPorId(id);
			res.status(200).json(rol);
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	// Actualizar un rol por ID
	updateRolById: async (req, res) => {
		try {
			const { id } = req.params;
			const { nombre, nivelPrivilegio, descripcion } = req.body;

            if(!nombre || !nivelPrivilegio || !descripcion || isNaN(nivelPrivilegio)){
                return res.status(400).json({error: "Faltan datos o los datos son incorrectos"})
            }

			await rolService.actualizarRol(id, {
				nombre,
				nivelPrivilegio,
				descripcion,
			});
			res.json({ message: "Rol actualizado correctamente" });
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},

	// Eliminar un rol por ID
	deleteRolById: async (req, res) => {
		try {
            const { id } = req.params;

            if(isNaN(id)){
                return res.status(400).json({error: "faltan datos o los datos son incorrectos"})
            }

            await rolService.borrarRol(id)
            res.json({message: "Rol eliminado correctamente"})
		
		} catch (error) {
			res.status(404).json({ error: error.message });
		}
	},
};

export default rolController;
