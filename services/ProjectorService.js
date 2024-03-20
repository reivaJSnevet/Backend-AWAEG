import projectorRepository from "../repositories/projectorRepository.js";
import { NotFoundError } from "../errors/index.js";

const projectorService = {
	createProjector: async (projector) => {
		try {
			const newProjector = await projectorRepository.create(projector);
			return newProjector;
		} catch (error) {
			throw error;
		}
	},

	getAllProjectors: async () => {
		try {
			const projectors = await projectorRepository.getAll();
			return projectors;
		} catch (error) {
			throw error;
		}
	},

	getProjectorById: async (projectorId) => {
		try {
			const projector = await projectorRepository.getById(projectorId);
			if (!projector) {
				throw new NotFoundError("Projector", projectorId);
			}

			return projector;
		} catch (error) {
			throw error;
		}
	},

	updateProjector: async (projectorId, updatedFields) => {
		try {
			const projectorUpdated = await projectorRepository.update(
				projectorId,
				updatedFields,
			);
			if (!projectorUpdated) {
				throw new NotFoundError("Projector", projectorId);
			}

			return projectorUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteProjector: async (projectorId) => {
		try {
			const projectorDeleted = await projectorRepository.delete(projectorId);
			if (!projectorDeleted) {
				throw new NotFoundError("Projector", projectorId);
			}

			return projectorDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default projectorService;
