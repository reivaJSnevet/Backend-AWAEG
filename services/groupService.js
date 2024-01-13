import groupRepository from "../repositories/groupRepository.js";

const groupService = {
    createGroup: async (group) => {
        try {
            const newGroup = await groupRepository.create(group);
            return newGroup;
        } catch (error) {
            const errors = [];

            if (error.name === "SequelizeUniqueConstraintError") {
                error.errors.forEach((e) => {
                    errors.push({
                        type: "UniqueConstraintError",
                        message: e.message,
                        field: e.path,
                    });
                });
            } else if (error.name === "SequelizeValidationError") {
                error.errors.forEach((e) => {
                    errors.push({
                        type: "ValidationError",
                        message: e.message,
                        field: e.path,
                    });
                });
            } else {
                throw error;
            }
            throw errors;
        }
    },

    getAllGroups: async () => {
        try {
            const groups = await groupRepository.getAll();
            return groups;
        } catch (error) {
            throw error;
        }
    },

    getGroupById: async (groupId) => {
        try {
            const group = await groupRepository.getById(groupId);
            return group;
        } catch (error) {
            throw error;
        }
    },

    updateGroup: async (groupId, updatedFields) => {
        try {
            const groupUpdated = await groupRepository.update(groupId, updatedFields);
            return groupUpdated;
        } catch (error) {
            const errors = [];

            if (error.name === "SequelizeUniqueConstraintError") {
                error.errors.forEach((e) => {
                    errors.push({
                        type: "UniqueConstraintError",
                        message: e.message,
                        field: e.path,
                    });
                });
            } else if (error.name === "SequelizeValidationError") {
                error.errors.forEach((e) => {
                    errors.push({
                        type: "ValidationError",
                        message: e.message,
                        field: e.path,
                    });
                });
            } else {
                throw error;
            }
            throw errors;
        }
    },

    deleteGroup: async (groupId) => {
        try {
            const groupDeleted = await groupRepository.delete(groupId);
            return groupDeleted;
        } catch (error) {
            throw error;
        }
    },

}

export default groupService;