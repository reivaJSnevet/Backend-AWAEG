import authService from "../services/authService.js";

const authController = {
	login: async (req, res) => {
		try {
			const { userName, password } = req.body;
			if (!userName || !password) {
				return res
					.status(400)
					.json({ message: "Empty username or password" });
			}

			const { accessToken, refreshToken, user } = await authService.login(
				userName,
				password,
			);

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				maxAge: 1000 * 60 * 60 * 24 * 1, //1 day
			});
			console.log(user)
			return res.status(200).json({accessToken, role: user.Role.roleName, id: user.Functionary.functionaryId});
		} catch (error) {
			if (error.name === "InvalidUsername") {
				return res.status(401).json({ error:error.name, message: error.message });
			} else if (error.name === "InvalidPassword") {
				return res.status(401).json({ error: error.name, message: error.message });
			} else {
				return res.status(500).json({ error: error.name, message: error.message });
			}
		}
	},
	logout: async (req, res) => {
		try {
			const { refreshToken } = req.cookies || {};

			if (!refreshToken) {
				return res
					.status(401)
					.json({ message: "No refresh token provided" });
			}

			await authService.logout(refreshToken);

			res.clearCookie("refreshToken", {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			});
			res.status(200).json({ message: "Logout successful" });
		} catch (error) {
			if (error.name === "InvalidRefreshToken") {
				res.clearCookie("refreshToken", {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				});
				return res.status(401).json({ error: error.name, message: error.message });
			} else {
				return res.status(500).json({ error: error.name, message: error.message });
			}
		}
	},
	handleRefreshToken: async (req, res) => {
		try {
			const { refreshToken } = req.cookies || {};

			if (!refreshToken) {
				return res
					.status(401)
					.json({ message: "No refresh token provided" });
			}

			const { accessToken } = await authService.handleRefreshToken(refreshToken);

			return res.status(200).json({ accessToken });
		} catch (error) {

			if (error.name === "InvalidRefreshToken") {
				return res.status(401).json({ error: error.name, message: error.message });
			} else {
				return res.status(500).json({ error: error.name, message: error.message });
			}
		}
	},
    confirmEmail: async (req, res) => {
        try {
            const { token } = req.params;

            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }
            const confirmEmailView = await authService.confirmEmail(token);
            return res.status(200).sendFile(confirmEmailView);
        } catch (error) {
            if (error.name === "InvalidToken") {
                return res.status(401).json({ error: error.name, message: error.message });
            } else {
                return res.status(500).json({ error: error.name, message: error.message });
            }
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Empty email" });
            }
            await authService.forgotPassword(email);
            return res.status(200).json({ message: "Email sent" });
        } catch (error) {
            if (error.name === "InvalidEmail") {
                return res.status(401).json({ error: error.name, message: error.message });
            } else {
                return res.status(500).json({ error: error.name, message: error.message });
            }
        }
    },

    resetPassword: async (req, res) => {
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
            if (error.name === "InvalidToken") {
                return res.status(401).json({ error: error.name, message: error.message });
            } else {
                return res.status(500).json({ error: error.name, message: error.message });
            }
        }
    },
};

export default authController;
