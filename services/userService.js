import userRepository from "../repositories/userRepository.js";
import sendVerificationEmail from "../helpers/emails/verificationEmail.js";
import { generateEmailToken } from "../helpers/tokens/emailVerifyToken.js";
import { NotFoundError, ForbiddenError } from "../errors/index.js";

const userService = {
	createUser: async (user) => {
		try {
			const userToken = { ...user, token: generateEmailToken() };
			const newUser = await userRepository.create(userToken);

            /* await sendVerificationEmail(newUser.email, newUser.token); */

			const userNoPassword = {
				...newUser.get(),
				token: undefined,
				password: undefined,
			};

			return userNoPassword;
		} catch (error) {
			throw error;
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
			if (!user) {
				throw new NotFoundError("User", userName);
			}
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
			if (!userUpdated) {
				throw new NotFoundError("User", userName);
			}

			return userUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteUser: async (userName) => {
		try {
			const user = await userRepository.getByUserName(userName);

			if (user?.Role?.privilegeLevel === 1) {
				throw new ForbiddenError(
                    "Cannot delete a user with privilege level 1",
                );
			}
			if (!user) {
				throw new NotFoundError("User", userName);
			}

			const userDeleted = await userRepository.delete(userName);
			return userDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default userService;
