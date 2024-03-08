import bcrypt from "bcrypt";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { UnauthorizedError, ForbiddenError } from "../errors/index.js";
import authRepository from "../repositories/authRepository.js";
import {
	generateAccessToken,
	generateRefreshToken,
	verifySignature,
} from "../helpers/tokens/jwt.js";
import { generateForgotToken } from "../helpers/tokens/forgotPasswordToken.js";
import sendForgotPasswordEmail from "../helpers/emails/forgotPasswordEmail.js";

const __CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __FILE_DIR = join(__CURRENT_DIR, "../");

const authService = {
	login: async (username, password) => {
		try {
			const user = await authRepository.getByUserName(username);
			if (!user) {
				throw new UnauthorizedError("Invalid username");
			}

			const isMatch = await user.verifyPassword(password);
			if (!isMatch) {
				throw new UnauthorizedError("Invalid password");
			}

			if (!user.verifyEmail) {
				throw new UnauthorizedError(
					"authService login: Email not verified",
					"Email not verified, please verify your email to be part of out system",
				);
			}

            delete user.dataValues.password;

			const accessToken = generateAccessToken(user);
			const refreshToken = generateRefreshToken(user);

			user.refreshToken = refreshToken;
			await user.save();

			return {
				accessToken,
                refreshToken,
				user
			};
		} catch (error) {
			throw error;
		}
	},

	logout: async (refreshToken) => {
		try {
			const user = await authRepository.getByRefreshToken(refreshToken);
			if (!user) {
				throw new ForbiddenError(refreshToken);
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
				throw new ForbiddenError(
					"authService handleRefreshToken: getByRefreshToken()",
					refreshToken,
				);
			}

			const decoded = await verifySignature(
				refreshToken,
				process.env.JWT_REFRESH_SECRET,
			);

			if (!decoded) {
				throw new ForbiddenError(
					"authService handleRefreshToken: verifySignature()",
					refreshToken,
				);
			}


            delete user.dataValues.password;
			const accessToken = generateAccessToken(user);
			return {
				accessToken,
				user: user,
			};
		} catch (error) {
			throw error;
		}
	},

	confirmEmail: async (token) => {
		try {
			const user = await authRepository.getByToken(token);

			if (!user) {
				throw new ForbiddenError(
					"authService confirmEmail: getByToken()",
					token,
				);
			}

			user.verifyEmail = true;
			user.token = null;

			await user.save();

			const confirmEmailView = path.join(
				__FILE_DIR,
				"views",
				"emailVerification.html",
			);
			return confirmEmailView;
		} catch (error) {
			throw error;
		}
	},

	forgotPassword: async (email) => {
		try {
			const user = await authRepository.getByEmail(email);

			if (!user) {
				throw new UnauthorizedError("Invalid email");
			}

			if (!user.verifyEmail) {
				throw new UnauthorizedError("Email not verified");
			}

			const token = generateForgotToken(user);

			user.recoveryToken = token;
			await user.save();

			return await sendForgotPasswordEmail(user.email, token);
		} catch (error) {
			throw error;
		}
	},

	resetPassword: async (token, password) => {
		try {
			const user = await authRepository.getByRecoveryToken(token);

			if (!user) {
				throw new ForbiddenError(
					"authService resetPassword: getByRecoveryToken()",
					token,
				);
			}

			if (!user.verifyEmail) {
				throw new UnauthorizedError("Email not verified");
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			user.recoveryToken = null;
			return await user.save();
		} catch (error) {
			throw error;
		}
	},
};

export default authService;
