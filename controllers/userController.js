import userService from "../services/userService.js";

const userController = {
	postUser: async (req, res) => {
		try {
			const newUser = await userService.createUser(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "error creating user",
					message: error.message,
				});
			}
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const users = await userService.getAllUsers();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({
				error: "error getting all users",
				message: error.message,
			});
		}
	},

	getUserByUserName: async (req, res) => {
		try {
			if (!req.params.userName) {
				return res.status(400).json({
					error: "missing user userName",
					message: "You must provide a user userName to get user",
				});
			}

			const user = await userService.getUserByUserName(
				req.params.userName,
			);

			if (user) {
				return res.status(200).json(user);
			} else {
				return res.status(404).json({
					error: "user not found",
					message: `There is no user with userName ${req.params.userName}`,
				});
			}
		} catch (error) {
			res.status(500).json({
				error: "error getting user by userName",
				message: error.message,
			});
		}
	},

	putUser: async (req, res) => {
		try {
			if (!req.params.userName) {
				return res.status(400).json({
					error: "missing user userName",
					message: "You must provide a user userName to update it",
				});
			}

			const userUpdated = await userService.updateUser(
				req.params.userName,
				req.body,
			);

			if (userUpdated) {
				return res.status(200).json({
					message: `user '${req.params.userName}' updated`,
				});
			} else {
				return res.status(404).json({
					error: "user not found",
					message: `There is no user with userName ${req.params.userName}`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "error updating user",
					message: error.message,
				});
			}
		}
	},

	deleteUser: async (req, res) => {
		try {
			if (!req.params.userName) {
				return res.status(400).json({
					error: "missing user userName",
					message: "You must provide a user userName to delete it",
				});
			}

			const userDeleted = await userService.deleteUser(
				req.params.userName,
			);

			if (userDeleted) {
				return res.status(200).json({
					message: `User with userName ${req.params.userName} deleted`,
				});
			} else {
				return res.status(404).json({
					error: "user not found",
					message: `There is no user with userName ${req.params.userName}`,
				});
			}
		} catch (error) {
			if (error.name === "ForbiddenError") {
				return res.status(403).json({
					error: "forbidden error",
					message: error.message,
				});
			}
			res.status(500).json({
				error: "error deleting user",
				message: error.message,
			});
		}
	},
};

export default userController;
