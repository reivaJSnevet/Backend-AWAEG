import groupService from "../services/groupService.js";

const groupController = {
	postGroup: async (req, res, next) => {
		try {
			const group = await groupService.createGroup(req.body);
			res.status(201).json(group);
		} catch (error) {
			next(error);
		}
	},
	getAllGroups: async (req, res, next) => {
		try {
			const groups = await groupService.getAllGroups();
			res.status(200).json(groups);
		} catch (error) {
			next(error);
		}
	},
	getGroupById: async (req, res, next) => {
		try {
			const group = await groupService.getGroupById(req.params.id);
			res.status(200).json(group);
		} catch (error) {
			next(error);
		}
	},
	putGroup: async (req, res, next) => {
		try {
			const group = await groupService.updateGroup(
				req.params.id,
				req.body,
			);
            res.status(200).json(group);
		} catch (error) {
			next(error);
		}
	},

	deleteGroup: async (req, res, next) => {
		try {
			const group = await groupService.deleteGroup(req.params.id);
            res.status(200).json(group);
		} catch (error) {
			next(error);
		}
	},
};

export default groupController;
