import authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";

const authService = {
	login: async (username, password) => {
		try {
			const user = await authRepository.getByUserName(username);
			if (!user) {
				const invalidUsername = new Error("Invalid username");
				invalidUsername.name = "InvalidUsername";
				throw invalidUsername;
			}

			const isMatch = await user.verifyPassword(password);
			if (!isMatch) {
				const invalidPassword = new Error("Invalid password");
				invalidPassword.name = "InvalidPassword";
				throw invalidPassword;
			}

			const accessToken = authService.generateAccessToken(user);
			const refreshToken = authService.generateRefreshToken(user);

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

	generateAccessToken: (user) => {
		try {
			const accessToken = jwt.sign(
				{
					userName: user.userName,
					role: {
						rolename: user.Role.roleName,
						privilegeLevel: user.Role.privilegeLevel,
					},
				},
				process.env.JWT_SECRET,
				{
					expiresIn: "1d",
				},
			);
			return accessToken;
		} catch (error) {
			throw error;
		}
	},

	generateRefreshToken: (user) => {
		try {
			const refreshToken = jwt.sign(
				{
					userName: user.userName,
					role: {
						rolename: user.Role.roleName,
						privilegeLevel: user.Role.privilegeLevel,
					},
				},
				process.env.JWT_REFRESH_SECRET,
				{
					expiresIn: "1d",
				},
			);
			return refreshToken;
		} catch (error) {
			throw error;
		}
	},
    
	handleRefreshToken: async (refreshToken) => {
		try {
			const user = await authRepository.getByRefreshToken(refreshToken);
			if (!user) {
				const invalidRefreshToken = new Error(
					"Invalid refresh token, user please login again",
				);
				invalidRefreshToken.name = "InvalidRefreshToken";
				throw invalidRefreshToken;
			}

			jwt.verify(
				refreshToken,
				process.env.JWT_REFRESH_SECRET,
				(err, decoded) => {
					if (err) {
						throw err;
					} else if (decoded.userName !== user.userName) {
						const invalidRefreshToken = new Error(
							"Invalid refresh token, user please login again",
						);
						invalidRefreshToken.name = "InvalidRefreshToken";
						throw invalidRefreshToken;
					}
				},
			);

			const accessToken = authService.generateAccessToken(user);
			return { accessToken };
		} catch (error) {
			throw error;
		}
	},
};

export default authService;
