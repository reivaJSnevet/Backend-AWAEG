import userRepository from "../repositories/userRepository.js";
import { generateEmailToken } from "../helpers/tokens/emailVerify.js";

const userService = {
	createUser: async (user) => {
		try {
			const userToken = { ...user, token: generateEmailToken() };
			const newUser = await userRepository.create(userToken);

			const userNoPassword = {
				...newUser.get(),
				token: undefined,
				password: undefined,
			};

			return userNoPassword;
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
			} else if (error.name === "SequelizeForeignKeyConstraintError") {
				errors.push({
					type: "ForeignKeyConstraintError",
					message: error.message,
					fields: error.fields,
				});
			} else {
				throw error;
			}
			throw errors;
		}
	},

	getAllUsers: async () => {
		try {
			const users = await userRepository.getAll();
			return users;
		} catch (error) {
			throw error;
		}
	},

	getUserByUserName: async (userName) => {
		try {
			const user = await userRepository.getByUserName(userName);
			return user;
		} catch (error) {
			throw error;
		}
	},

	updateUser: async (userName, updatedFields) => {
		try {
			const userUpdated = await userRepository.update(
				userName,
				updatedFields,
			);
			return userUpdated;
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

	deleteUser: async (userName) => {
		try {
			const user = await userRepository.getByUserName(userName);

			if (user?.Role?.privilegeLevel === 1) {
				const forbiddenError = new Error(
					`User '${userName}' is an admin and cannot be deleted. Please contact an admin to delete this user.`,
				);
				forbiddenError.name = "ForbiddenError";
				throw forbiddenError;
			}

			const userDeleted = await userRepository.delete(userName);
			return userDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default userService;
