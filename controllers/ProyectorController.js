import projectorService from "../services/ProjectorService.js";

const ProjectorController
 = {
	postProjector: async (req, res, next) => {
		try {
			const newProjector = await projectorService.createProjector(req.body);
			res.status(201).json(newProjector);
		} catch (error) {
			next(error);
		}
	},
	getAllProjectors: async (req, res, next) => {
		try {
			const projectors = await projectorService.getAllProjectors();
			res.status(200).json(projectors);
		} catch (error) {
			next(error);
		}
	},
	getProjectorById: async (req, res, next) => {
		try {
			const projector = await projectorService.getProjectorById(req.params.id);
			res.status(200).json(projector);
		} catch (error) {
			next(error);
		}
	},
	putProjector: async (req, res, next) => {
		try {
			const projector = await projectorService.updateProjector(req.params.id, req.body);
			res.status(200).json(projector);
		} catch (error) {
			next(error);
		}
	},
	deleteProjector: async (req, res, next) => {
		try {
			const projector = await projectorService.deleteProjector(req.params.id);
			res.status(200).json(projector);
		} catch (error) {
			next(error);
		}
	},
};

export default ProjectorController
;
