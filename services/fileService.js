import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import FileRepository from "../repositories/fileRepository.js";
import { NotFoundError, ValidationError } from "../errors/index.js";
const __CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __FILE_DIR = join(__CURRENT_DIR, "../");
import functionaryRepository from "../repositories/functionaryRepository.js";
import db from "../config/db.js";

const FileService = {
	createFile: async (uploadedFile, userData) => {
		try {
			const existFile = await FileRepository.findWhere({
				originalName: uploadedFile.originalname,
				functionaryId: userData.functionaryId,
			});

			if (existFile) {
				throw new ValidationError(
					`File ${existFile.originalName} already exists`,
				);
			}

			const sectionData = JSON.parse(userData.section);

            const functionary = await functionaryRepository.getById(userData.functionaryId);

			const fileData = {
				fileName: uploadedFile.filename,
				originalName: uploadedFile.originalname,
				mimeType: uploadedFile.mimetype,
				path: uploadedFile.path,
				size: uploadedFile.size,
				functionaryId: functionary.Functionary.functionaryId,
			};

			const newFile = await FileRepository.create(fileData, sectionData);

			return newFile;
		} catch (error) {
			fs.unlinkSync(uploadedFile.path);
			throw error;
		}
	},

	getAllFiles: async (section) => {
		try {
			const files = await FileRepository.findAll(section);
			return files;
		} catch (error) {
			throw error;
		}
	},

	getFileById: async (fileId) => {
		try {
			const file = await FileRepository.findById(fileId);
			if (!file) {
				throw new NotFoundError("File", fileId);
			}

			return file.path;
		} catch (error) {
			throw error;
		}
	},

	updateFile: async (fileId, updatedFields) => {
		try {
			const fileUpdated = await FileRepository.update(
				fileId,
				updatedFields,
			);

			if (!fileUpdated) {
				throw new NotFoundError("File", fileId);
			}

			return fileUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteFile: async (fileId) => {
        const t = await db.transaction();
		try {

			const file = await FileRepository.findById(fileId);
			if (!file) {
				throw new NotFoundError("File", fileId);
			}

			const fileDeleted = await FileRepository.delete(fileId, t);
			fs.unlinkSync(file.path);
            await t.commit();
			return fileDeleted;
		} catch (error) {
            await t.rollback();
			throw error;
		}
	},
};

export default FileService;
