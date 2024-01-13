import fs from "fs";
import multer from "multer";
import { extname } from "path";
import functionaryRepository from "../repositories/functionaryRepository.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const __FILE_DIR = join(__CURRENT_DIR, "../");

// Set file filter
const mimeTypes = [
	"image/png",
	"image/jpg",
	"image/jpeg",
	"application/pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const fileName = (req, file, cb) => {
	const fileExt = extname(file.originalname);
	const filename = file.originalname.split(fileExt)[0];
	cb(null, `${filename}-${Date.now()}${fileExt}`);
};

//destinations
const destination = async (req, file, cb) => {
	try {
		const { functionaryId } = req.body;

		// Verify if functionary exists
		const functionary = await functionaryRepository.getById(functionaryId);

		// Verify if functionary exists or conatains letters
		if (!functionary || !/^[0-9]+$/.test(functionaryId)) {
			return cb(new Error("Invalid functionary id"));
		}

		// Set folder path
		const groupFolder = join(__FILE_DIR, `./uploads/functionary_${functionaryId}`);

		try {
			// Verify if folder exists
			await fs.promises.access(groupFolder);

			// If folder exists, return it
			return cb(null, groupFolder);
		} catch (error) {
			// if folder doesn't exist, create it
			if (error.code !== "ENOENT") {
				throw error;
			} else {
				await fs.promises.mkdir(groupFolder, { recursive: true });
				console.log(`Folder created: ${groupFolder}`);
				return cb(null, groupFolder);
			}
		}
	} catch (error) {
		console.error(`Error in destination function: ${error}`);
		return cb(error);
	}
};

// Set storage configuration
const storage = multer.diskStorage({
	destination: destination,
	filename: fileName,
});

//set file limit
const limits = {
	fileSize: 1024 * 1024 * 10, // 10MB
};

const fileFilter = (req, file, cb) => {
	// Only allow uploading of a single file
	if (file.fieldname !== "file") {
		cb(new Error("Invalid field name"));
	} else if (mimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Invalid file type"));
	}
};

// Set upload configuration
const upload = multer({
	storage: storage,
	limits: limits,
	fileFilter: fileFilter,
});

export default upload;
