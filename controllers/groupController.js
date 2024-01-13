import groupService from "../services/groupService.js";

const groupController = {
    postGroup: async (req, res) => {
        try {
            const group = await groupService.createGroup(req.body);
            res.status(201).json(group);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).json({ error });
            } else {
                res.status(500).json({
                    error: "Error creating group",
                    message: error.message,
                });
            }
        }
    },

    getAllGroups: async (req, res) => {
        try {
            const groups = await groupService.getAllGroups();
            res.status(200).json(groups);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving groups",
                message: error.message,
            });
        }
    },

    getGroupById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing group ID",
                    message: "You must specify a group ID to retrieve it",
                });
            }

            const group = await groupService.getGroupById(req.params.id);

            if (group) {
                return res.status(200).json(group);
            } else {
                return res.status(404).json({
                    error: `Group not found`,
                    message: `No group found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving group",
                message: error.message,
            });
        }
    },

    putGroup: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing group ID",
                    message: "You must specify a group ID to update it",
                });
            }

            const group = await groupService.updateGroup(req.params.id, req.body);

            if (group) {
                return res.status(200).json({
                    message: `group '${req.params.id}' updated`,
                });
            } else {
                return res.status(404).json({
                    error: `Group not found`,
                    message: `No group found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).json({ error });
            } else {
                res.status(500).json({
                    error: "Error updating group",
                    message: error.message,
                });
            }
        }
    },

    deleteGroup: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing group ID",
                    message: "You must specify a group ID to delete it",
                });
            }

            const groupDeleted = await groupService.deleteGroup(req.params.id);

            if (groupDeleted) {
                return res.status(200).json({
                    message: `Group deleted successfully`,
                });
            } else {
                return res.status(404).json({
                    error: `Group not found`,
                    message: `No group found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error deleting group",
                message: error.message,
            });
        }
    },

};

export default groupController;