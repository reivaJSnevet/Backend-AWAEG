import userService from "../services/userService.js";

const userController = {
	postUser: async (req, res, next) => {
		try {
			const newUser = await userService.createUser(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	},
	getAllUsers: async (req, res, next) => {
		try {
			const users = await userService.getAllUsers();
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	},
	getUserByUserName: async (req, res, next) => {
		try {
			const user = await userService.getUserByUserName(
				req.params.userName,
			);
			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
	putUser: async (req, res, next) => {
		try {
			const user = await userService.updateUser(
				req.params.userName,
				req.body,
			);
			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
	deleteUser: async (req, res, next) => {
		try {
			const user = await userService.deleteUser(req.params.userName);
			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
};

export default userController;
