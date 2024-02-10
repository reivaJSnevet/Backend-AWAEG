import { User, Role } from "../models/index.js";

const userRepository = {
	create: async (user) => {
		try {
			const newUser = await User.create(user);
			return newUser;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const users = await User.findAll({ include: Role });
			return users;
		} catch (error) {
			throw error;
		}
	},

	getByUserName: async (userName) => {
		try {
			const user = await User.findOne({
				include: Role,
				where: { userName: userName },
			});
			return user;
		} catch (error) {
			throw error;
		}
	},

	update: async (userName, updatedFields) => {
		try {
			const userUpdated = await User.update(updatedFields, {
				where: { userName: userName },
				individualHooks: true,
			});
			return userUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (userName) => {
		try {
			const userDeleted = await User.destroy({
				where: { userName: userName },
			});
			return userDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default userRepository;
