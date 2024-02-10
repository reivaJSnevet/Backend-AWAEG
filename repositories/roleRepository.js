import { Role } from "../models/index.js";

const roleRepository = {
	create: async (role) => {
		try {
			const newRole = await Role.create(role);
			return newRole;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const roles = await Role.findAll();
			return roles;
		} catch (error) {
			throw error;
		}
	},

	getById: async (roleId) => {
		try {
			const role = await Role.findByPk(roleId);
			return role;
		} catch (error) {
			throw error;
		}
	},

	update: async (roleId, updatedFields) => {
		try {
			const roleUpdated = await Role.update(updatedFields, {
				where: { roleId },
				individualHooks: true,
			});

			return roleUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (roleId) => {
		try {
			const roleDeleted = await Role.destroy({ where: { roleId } });
			return roleDeleted;
		} catch (error) {
			throw error;
		}
	},
	getAllWhere: async (where) => {
		try {
			const role = await Role.findAll({ where });
			return role;
		} catch (error) {
			throw error;
		}
	},
};

export default roleRepository;
