import authService from "../services/authService.js";

const authController = {
	login: async (req, res, next) => {
		try {
			const { userName, password } = req.body;
			const { accessToken, refreshToken, user } = await authService.login(
				userName,
				password,
			);

			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "None",
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});


			return res.status(200).json({ accessToken, user });
		} catch (error) {
			next(error);
		}
	},
	logout: async (req, res, next) => {
		try {
			const { jwt } = req.cookies || {};

			if (!jwt) {
				return res
					.status(401)
					.json({ message: "No refresh token provided" });
			}

			await authService.logout(jwt);

			res.clearCookie("jwt", {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			});
			res.status(200).json({ message: "Logout successful" });
		} catch (error) {
			next(error);
		}
	},
	handleRefreshToken: async (req, res, next) => {
		try {
            const { jwt } = req.cookies || {};
			if (!jwt) {
				return res
					.status(401)
					.json({ message: "No refresh token provided" });
			}

            const {accessToken, user} = await authService.handleRefreshToken(jwt)
            res.status(200).json({ accessToken, user });
		} catch (error) {
			next(error);
		}
	},
	confirmEmail: async (req, res, next) => {
		try {
			const { token } = req.params;

			if (!token) {
				return res.status(401).json({ message: "No token provided" });
			}
			const confirmEmailView = await authService.confirmEmail(token);
			return res.status(200).sendFile(confirmEmailView);
		} catch (error) {
			next(error);
		}
	},
	forgotPassword: async (req, res, next) => {
		try {
			const { email } = req.body;
			if (!email) {
				return res.status(400).json({ message: "Empty email" });
			}
			await authService.forgotPassword(email);
			return res.status(200).json({ message: "Email sent" });
		} catch (error) {
			next(error);
		}
	},

	resetPassword: async (req, res, next) => {
		try {
			const { token } = req.params;
			const { password } = req.body;
			if (!token) {
				return res.status(400).json({ message: "Empty token" });
			}
			if (!password) {
				return res.status(400).json({ message: "Empty password" });
			}
			await authService.resetPassword(token, password);
			return res.status(200).json({ message: "Password changed" });
		} catch (error) {
			next(error);
		}
	},
};

export default authController;