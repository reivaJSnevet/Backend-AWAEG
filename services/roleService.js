import roleRepository from "../repositories/roleRepository.js";

const roleService = {
	createRol: async (role) => {
		try {
			const newRole = await roleRepository.create(role);
			return newRole;
		} catch (error) {
			const errors = [];
			if (error.name === "SequelizeUniqueConstraintError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "UniqueConstraintError",
						message: e.message,
						field: e.path,
					});
				});
			} else if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "ValidationError",
						message: e.message,
						field: e.path,
					});
				});
			} else {
				throw error;
			}
			throw errors;

			//Podria poner codigo al error al personalizarlos, asi en la siguiente capa se pueda manejar en un if con el codigo de error http
		}
	},

	getAllRoles: async () => {
		try {
			const roles = await roleRepository.getAll();
			return roles;
		} catch (error) {
			throw error;
		}
	},

	getRoleById: async (roleId) => {
		try {
			const role = await roleRepository.getById(roleId);
			return role;
		} catch (error) {
			throw error;
		}
	},

	updateRole: async (roleId, updatedFields) => {
		try {

			const roleUpdated = await roleRepository.update(
				roleId,
				updatedFields,
			);

			return roleUpdated;
		} catch (error) {
			const errors = [];
			if (error.name === "SequelizeUniqueConstraintError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "UniqueConstraintError",
						message: e.message,
						field: e.path,
					});
				});
			} else if (error.name === "SequelizeValidationError") {
				error.errors.forEach((e) => {
					errors.push({
						type: "ValidationError",
						message: e.message,
						field: e.path,
					});
				});
			} else {
				throw error;
			}
			throw errors;
		}
	},

	deleteRole: async (roleId) => {
		try {
			const role = await roleRepository.getById(roleId);

			if (role?.privilegeLevel === 1) {
				const forbiddenError = new Error(
					`The role '${role.roleName}' must not be deleted. Please request assistance from the database administrator`,
				);
                forbiddenError.name = "ForbiddenError";
                throw forbiddenError;
			}

			const roleDeleted = await roleRepository.delete(roleId);

			return roleDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default roleService;
