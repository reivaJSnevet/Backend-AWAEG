import roleRepository from "../repositories/roleRepository.js";
import { NotFoundError, ValidationError } from "../errors/index.js";

const roleService = {
	createRol: async (role) => {
		try {
			const newRole = await roleRepository.create(role);
			return newRole;
		} catch (error) {
			throw error; 
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
            if (!role) {
                throw new NotFoundError("Role", roleId);
            }

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
            if (!roleUpdated) {
                throw new NotFoundError("Role", roleId);
            }

			return roleUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteRole: async (roleId) => {
		try {
			const role = await roleRepository.getById(roleId);
            if (!role) {
                throw new NotFoundError("Role", roleId);
            }
			if (role?.privilegeLevel === 1) {
				throw new ValidationError(
                    "Cannot delete a role with privilege level 1",
                );
			}

			const roleDeleted = await roleRepository.delete(roleId);

			return roleDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default roleService;
