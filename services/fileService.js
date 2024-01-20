import FileRepository from "../repositories/fileRepository.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __FILE_DIR = join(__CURRENT_DIR, "../");

const FileService = {
	createFile: async (uploadedFile, userData) => {
		try {

			const existFile = await FileRepository.findWhere({
				originalName: uploadedFile.originalname,
				functionaryId: userData.functionaryId,
			});

			if (existFile) {
				throw new Error("File already exists");
			}

			const sectionData = JSON.parse(userData.section);

			const fileData = {
				fileName: uploadedFile.filename,
				originalName: uploadedFile.originalname,
				mimeType: uploadedFile.mimetype,
				path: uploadedFile.path,
                size: uploadedFile.size,
				functionaryId: userData.functionaryId,
			};

			const newFile = await FileRepository.create(fileData, sectionData);

			return newFile;
		} catch (error) {
			const errors = [];
			fs.unlinkSync(uploadedFile.path);

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
			} else if (error.name === "SequelizeForeignKeyConstraintError") {
				errors.push({
					type: "ForeignKeyConstraintError",
					message: error.message,
					field: error.fields,
				});
			} else {
				throw error;
			}
			throw errors;
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
			const filePath = join(__FILE_DIR, file.path);

			return filePath;
		} catch (error) {
			throw error;
		}
	},

	updateFile: async (fileId, updatedFields) => {
		try {
			const keyRestrictions = ["active"];

			if (
				Object.keys(updatedFields).some(
					(key) => !keyRestrictions.includes(key),
				)
			) {
				const invalidField = new Error("Invalid field");
				invalidField.name = "InvalidField";
				invalidField.fields = Object.keys(updatedFields).filter(
					(key) => !keyRestrictions.includes(key),
				);
				throw invalidField;
			}

			const fileUpdated = await FileRepository.update(
				fileId,
				updatedFields,
			);
			return fileUpdated;
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
			} else if (error.name === "InvalidField") {
				errors.push({
					type: "InvalidField",
					message: error.message,
					field: error.fields,
				});
			} else {
				throw error;
			}
			throw errors;
		}
	},

	deleteFile: async (fileId) => {
		try {
			const file = await FileRepository.findById(fileId);

			if (!file) {
				return null;
			}

			const filePath = join(__FILE_DIR, file.path);
			const fileDeleted = await FileRepository.delete(fileId);
			fs.unlinkSync(filePath);
			return fileDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default FileService;