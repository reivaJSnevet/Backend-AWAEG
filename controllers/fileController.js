import FileService from "../services/fileService.js";

const FileController = {
	postFile: async (req, res, next) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: "File is required" });
			}

			const file = await FileService.createFile(req.file, req.body);

			res.status(201).json(file);
		} catch (error) {
			next(error);
		}
	},
	getAllFiles: async (req, res, next) => {
		try {
			const files = await FileService.getAllFiles(req.params.section);
			res.status(200).send(files);
		} catch (error) {
			next(error);
		}
	},
	getFileById: async (req, res, next) => {
		try {
			const filePath = await FileService.getFileById(req.params.id);
			res.download(filePath, (error) => {
				if (error) {
					res.status(500).json({
						message: "Error downloading file",
						error: error.message,
					});
				}
			});
		} catch (error) {
			next(error);
		}
	},
	putFile: async (req, res, next) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({ message: "File id is required" });
			}

			const file = await FileService.updateFile(req.params.id, req.body);
			res.status(200).json(file);
		} catch (error) {
			next(error);
		}
	},
	deleteFile: async (req, res, next) => {
		try {
			const file = await FileService.deleteFile(req.params.id);
			res.status(200).json(file);
		} catch (error) {
			next(error);
		}
	},
};

export default FileController;
