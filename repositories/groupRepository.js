import {Group} from "../models/index.js";

const groupRepository = {
    create: async (group) => {
        try {
            const newGroup = await Group.create(group);
            return newGroup;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const groups = await Group.findAll();
            return groups;
        } catch (error) {
            throw error;
        }
    },

    getById: async (groupId) => {
        try {
            const group = await Group.findByPk(groupId);
            return group;
        } catch (error) {
            throw error;
        }
    },

    update: async (section, updatedFields) => {
        try {
            const groupUpdated = await Group.update(updatedFields, {
                where: { section },
            });
            return groupUpdated[0];
        } catch (error) {
            throw error;
        }
    },

    delete: async (section) => {
        try {
            const groupDeleted = await Group.destroy({ where: { section } });
            return groupDeleted;
        } catch (error) {
            throw error;
        }
    },

}

export default groupRepository;