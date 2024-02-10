import groupRepository from "../repositories/groupRepository.js";
import { NotFoundError } from "../errors/index.js";

const groupService = {
    createGroup: async (group) => {
        try {
            const newGroup = await groupRepository.create(group);
            return newGroup;
        } catch (error) {
            throw error;
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
            if (!group) {
                throw new NotFoundError("Group", groupId);
            }

            return group;
        } catch (error) {
            throw error;
        }
    },

    updateGroup: async (groupId, updatedFields) => {
        try {
            const groupUpdated = await groupRepository.update(groupId, updatedFields);
            if (!groupUpdated) {
                throw new NotFoundError("Group", groupId);
            }

            return groupUpdated;
        } catch (error) {
            throw error;
        }
    },

    deleteGroup: async (groupId) => {
        try {
            const groupDeleted = await groupRepository.delete(groupId);
            if (!groupDeleted) {
                throw new NotFoundError("Group", groupId);
            }

            return groupDeleted;
        } catch (error) {
            throw error;
        }
    },

}

export default groupService;