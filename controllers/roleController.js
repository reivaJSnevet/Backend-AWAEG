import roleService from "../services/roleService.js";

const roleController = {
	postRole: async (req, res) => {
		try {
			const newRole = await roleService.createRol(req.body);
			res.status(201).json(newRole);
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				res.status(500).json({
					error: "Error creating role",
					message: error.message,
				});
			}
		}
	},

	getAllRoles: async (req, res) => {
		try {
			const roles = await roleService.getAllRoles();
			res.status(200).json(roles);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving roles",
				message: error.message,
			});
		}
	},

	getRoleById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing role ID",
                    message: "You must specify a role ID to retrieve it",
				});
			}

			const role = await roleService.getRoleById(req.params.id);

			if (role) {
				return res.status(200).json(role);
			} else {
				return res.status(404).json({
					error: `Role not found`,
                    message: `No role found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving role",
				message: error.message,
			});
		}
	},

	putRole: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing role ID",
                    message: "You must specify a role ID to update it",
				});
			}

			const roleUpdated = await roleService.updateRole(req.params.id, req.body);

			if (roleUpdated) {
				return res
					.status(200)
					.json({
						message: `role '${req.params.id}' updated`,
					});
			} else {
				return res.status(404).json({
					error: `Role not found`,
                    message: `No role found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				res.status(500).json({
					error: "Error updating role",
					detalle: error.message,
				});
			}
		}
	},

	deleteRole: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing role ID",
                    message: "You must specify a role ID to delete it",
				});
			}

			const roleDeleted = await roleService.deleteRole(req.params.id);

			if (roleDeleted) {
				return res.status(200).json({message: `Rol '${req.params.id}' deleted successfully`});
			} else {
				return res.status(404).json({
					error: `Role not found`,
                    message: `No role found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
            if (error.name === "ForbiddenError") {
                return res.status(403).json({
                    error: "Forbidden",
                    message: error.message,
                });
            }
			res.status(500).json({
				error: "Error deleting role",
				detalle: error.message,
			});
		}
	},
};

export default roleController;
