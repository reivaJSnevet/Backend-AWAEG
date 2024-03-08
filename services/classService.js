import classRepository from "../repositories/classRepository.js";
import { NotFoundError, ValidationError } from "../errors/index.js";

const classService = {
	createClass: async (classData) => {
		try {
			const { Timetables } = classData;

			const noon = new Date();
			noon.setHours(13);

			if (Timetables) {
				Timetables.forEach((timetable) => {
					const startTime = new Date();
					startTime.setHours(timetable.startTime.split(":")[0]);

					const isMatutino = classData.shift === "matutino";
					const isVespertino = classData.shift === "vespertino";

					if (
						(isMatutino && startTime >= noon) ||
						(isVespertino && startTime < noon)
					) {
						const errorMessage = isMatutino
							? "The timetable must be in the morning"
							: "The timetable must be in the afternoon";

						throw new ValidationError(errorMessage);
					}
				});
			}

			const newClass = await classRepository.create(
				classData,
				Timetables,
			);

			return newClass;
		} catch (error) {
			throw error;
		}
	},

	getAllClasses: async () => {
		try {
			const classes = await classRepository.findAll();
			return classes;
		} catch (error) {
			throw error;
		}
	},

	getClassesBySection: async (section) => {
		try {
			const classData = await classRepository.findAllBySection(section);
            if (!classData) {
                throw new NotFoundError("Class", classId);
            }

			return classData;
		} catch (error) {
			throw error;
		}
	},

	updateClass: async (classId, classData) => {
		try {
			const classData = await classRepository.update(
				classId,
				classData,
			);
            if (!classData) {
                throw new NotFoundError("Class", classId);
            }

			return classData;
		} catch (error) {
            throw error;
        }
	},

	deleteClass: async (classId) => {
		try {
			const deletedClass = await classRepository.delete(classId);
            if (!deletedClass) {
                throw new NotFoundError("Class", classId);
            }

			return deletedClass;
		} catch (error) {
			throw error;
		}
	},
};

export default classService;
