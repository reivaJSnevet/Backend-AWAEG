import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import authRepository from "../repositories/authRepository.js";
import { generateAccessToken, generateRefreshToken, verifySignature } from "../helpers/tokens/jwt.js";
import { generateForgotToken } from "../helpers/tokens/forgotPasswordToken.js";
import sendForgotPasswordEmail from "../helpers/emails/forgotPasswordEmail.js";
import bcrypt from "bcrypt";

const __CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __FILE_DIR = join(__CURRENT_DIR, "../");

const authService = {
	login: async (username, password) => {
		try {
			const user = await authRepository.getByUserName(username);
			if (!user) {
				const invalidUsername = new Error("Invalid username");
				invalidUsername.name = "InvalidUsername";
				throw invalidUsername;
			}

            if(!user.verifyEmail) {
                const invalidEmail = new Error("Please verify your email");
                invalidEmail.name = "InvalidEmail";
                throw invalidEmail;
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

			return { accessToken, refreshToken, user };
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

    forgotPassword: async (email) => {
        try {
            const user = await authRepository.getByEmail(email);

            if (!user || !user.verifyEmail) {
                const invalidEmailError = new Error("Invalid email or email not verified");
                invalidEmailError.name = "InvalidEmail";
                throw invalidEmailError;
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

            if (!user || !user.verifyEmail) {
                const invalidTokenError = new Error("Invalid token or email not verified");
                invalidTokenError.name = "InvalidToken";
                throw invalidTokenError;
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
