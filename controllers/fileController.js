import FileService from "../services/fileService.js";

const FileController = {
	postFile: async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: "File is required" });
			}

			const file = await FileService.createFile(req.file, req.body);

			res.status(201).json(file);
		} catch (error) {
			if (Array.isArray(error)) {
				res.status(400).json(error);
			} else {
				res.status(500).json({
					error: "Error creating file",
					message: error.message,
				});
			}
		}
	},

	getAllFiles: async (req, res) => {
		try {
			const files = await FileService.getAllFiles(req.params.section);
			res.status(200).send(files);
		} catch (error) {
			res.status(400).send(error);
		}
	},

	getFileById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({ message: "File id is required" });
			}

			const filePath = await FileService.getFileById(req.params.id);

			if (!filePath) {
				return res.status(404).json({ message: "File not found" });
			}

			res.download(filePath, (error) => {
				if (error) {
					res.status(500).json({
						message: "Error downloading file",
						error: error.message,
					});
				}
			});
		} catch (error) {
			res.status(500).send(error);
		}
	},

	putFile: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({ message: "File id is required" });
			}

			const file = await FileService.updateFile(req.params.id, req.body);

			if (file) {
				res.status(200).json({ message: "File updated" });
			} else {
				res.status(404).json({ message: "File not found" });
			}
		} catch (error) {
			res.status(400).send(error);
		}
	},

	deleteFile: async (req, res) => {
		try {
			const file = await FileService.deleteFile(req.params.id);

			if (file) {
				res.status(200).json({ message: "File deleted" });
			} else {
				res.status(404).json({ message: "File not found" });
			}
		} catch (error) {
			res.status(400).send(error);
		}
	},
};

export default FileController;
