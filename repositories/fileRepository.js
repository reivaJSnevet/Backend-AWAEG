import { File, Functionary, Group, Person } from "../models/index.js";
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
				attributes: [
					"fileId",
					"fileName",
					"originalName",
					"mimeType",
					"active",
                    "size",
				],
				include: [
					{
						model: Group,
						attributes: ["section"],
						where: { section },
					},
                    {
                        model:Functionary,
                        include: [
                            {
                                model: Person,
                                attributes: ["name", "middleName", "lastName", "lastName2"]
                            },
                        ]
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
                individualHooks: true,
			});
			return fileUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (fileId, transaction) => {
		try {
			const fileDeleted = await File.destroy({ where: { fileId } }, { transaction });
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
