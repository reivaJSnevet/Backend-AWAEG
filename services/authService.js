import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import authRepository from "../repositories/authRepository.js";
import { generateAccessToken, generateRefreshToken, verifySignature } from "../helpers/tokens/jwt.js";

const __CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __FILE_DIR = join(__CURRENT_DIR, "../");

const authService = {
	login: async (username, password) => {
		try {
			const user = await authRepository.getByUserName(username);
			if (!user || !user.verifyEmail) {
				const invalidUsername = new Error("Invalid username or email not verified yet");
				invalidUsername.name = "InvalidUsername";
				throw invalidUsername;
			}

			const isMatch = await user.verifyPassword(password);
			if (!isMatch) {
				const invalidPassword = new Error("Invalid password");
				invalidPassword.name = "InvalidPassword";
				throw invalidPassword;
			}

			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);

			user.refreshToken = refreshToken;
			await user.save();

			return { accessToken, refreshToken };
		} catch (error) {
			throw error;
		}
	},

	logout: async (refreshToken) => {
		try {
			const user = await authRepository.getByRefreshToken(refreshToken);
			if (!user) {
				const invalidRefreshToken = new Error(
					"Invalid refresh token, user please login again",
				);
				invalidRefreshToken.name = "InvalidRefreshToken";
				throw invalidRefreshToken;
			}

			user.refreshToken = null;
			return await user.save();
		} catch (error) {
			throw error;
		}
	},

	handleRefreshToken: async (refreshToken) => {
		try {
			const user = await authRepository.getByRefreshToken(refreshToken);

			if (!user) {
				const invalidRefreshToken = new Error(
					"Invalid refresh token, user not found",
				);
				invalidRefreshToken.name = "InvalidRefreshToken";
				throw invalidRefreshToken;
			}

			/* jwt.verify(
				refreshToken,
				process.env.JWT_REFRESH_SECRET,
				(err, decoded) => {
					if (err) {
						throw err;
					} else if (decoded.userName !== user.userName) {
						const invalidRefreshToken = new Error(
							"Invalid refresh token, this token is not signed",
						);
						invalidRefreshToken.name = "InvalidRefreshToken";
						throw invalidRefreshToken;
					}
				},
			); */

            const decoded = await verifySignature(refreshToken, process.env.JWT_REFRESH_SECRET);

            if(!decoded) {
                const invalidRefreshToken = new Error(
                    "Invalid refresh token, this token is not signed",
                );
                invalidRefreshToken.name = "InvalidRefreshToken";
                throw invalidRefreshToken;
            }

			const accessToken = generateAccessToken(user);
			return { accessToken };
		} catch (error) {
			throw error;
		}
	},

	confirmEmail: async (token) => {
		try {
			const user = await authRepository.getByToken(token);

			if (!user) {
				const invalidTokenError = new Error("Invalid token");
				invalidTokenError.name = "InvalidToken";
				throw invalidTokenError;
			}

			user.verifyEmail = true;
			user.token = null;

            await user.save();

            const confirmEmailView = path.join(__FILE_DIR, 'views', 'emailVerification.html');
			return confirmEmailView

		} catch (error) {
			throw error;
		}
	},
};

export default authService;
