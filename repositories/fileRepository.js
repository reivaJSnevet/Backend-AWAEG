import { File, Group } from "../models/index.js";
import db from "../config/db.js";

const FileRepository = {
	create: async (file, sectionData = []) => {
		const t = await db.transaction();
		try {
			const newFile = await File.create(file, { transaction: t });
			await newFile.addGroups(sectionData, { transaction: t });

			await t.commit();
			return newFile;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	},

    findAll: async (section) => {
        try {
            return await File.findAll({
                where: { active: true },
                attributes: ["fileId", "fileName", "originalName", "mimeType", "active"],
                include: [
                    {
                        model: Group,
                        attributes: [],
                        where: { section },
                    }
                ],
            });
        } catch (error) {
            throw error;
        }
    },

	findById: async (fileId) => {
		try {
			return await File.findByPk(fileId);
		} catch (error) {
			throw error;
		}
	},

	update: async (fileId, file) => {
		try {
			const fileUpdated = await File.update(file, {
				where: { fileId },
			});
			return fileUpdated[0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (fileId) => {
		try {
			const fileDeleted = await File.destroy({ where: { fileId } });
			return fileDeleted;
		} catch (error) {
			throw error;
		}
	},

    findWhere: async (where) => {
        try {
            return await File.findOne({ where });
        } catch (error) {
            throw error;
        }
    },
};

export default FileRepository;
