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

//Por si acaso!! antigua logica de multer

/* import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { extname } from "path";
import multer from "multer"; */
/* 
const __currentDir = dirname(fileURLToPath(import.meta.url));
const __fileDir = join(__currentDir, "../uploads"); // <- Logica para separar los archivos por carpetas segun seccion o profesor

const allowFileTypes = [
	"image/png",
	"image/jpeg",
	"image/gif",
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const multerUpload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, __fileDir);
		},
		filename: (req, file, cb) => {
			const fileExt = extname(file.originalname);
			const filename = file.originalname.split(fileExt)[0];

			cb(null, `${filename}-${Date.now()}${fileExt}`);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (allowFileTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(
				new Error(
					"Invalid file type, only images and documents are allowed",
				),
			);
		}
	},
	limits: {
		fieldSize: 10000000,
	},
}); */
