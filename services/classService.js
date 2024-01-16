import classRepository from "../repositories/classRepository.js";

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

						throw new Error(errorMessage);
					}
				});
			}

			const newClass = await classRepository.create(
				classData,
				Timetables,
			);

			return newClass;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeConstraintError") {
				error.errors.map((error) => {
					errors.push(error.message);
				});
			} else if (error.name === "SequelizeValidationError") {
				error.errors.map((error) => {
					errors.push(error.message);
				});
			} else {
				throw error;
			}
			throw new Error(errors);
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

	getClassById: async (classId) => {
		try {
			const foundClass = await classRepository.findById(classId);
			return foundClass;
		} catch (error) {
			throw error;
		}
	},

	updateClass: async (classId, classData) => {
		try {
			const updatedClass = await classRepository.update(
				classId,
				classData,
			);
			return updatedClass;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeConstraintError") {
				error.errors.map((error) => {
					errors.push(error.message);
				});
			} else if (error.name === "SequelizeValidationError") {
				error.errors.map((error) => {
					errors.push(error.message);
				});
			} else {
				throw error;
			}

			throw errors;
		}
	},

	deleteClass: async (classId) => {
		try {
			const deletedClass = await classRepository.delete(classId);
			return deletedClass;
		} catch (error) {
			throw error;
		}
	},
};

export default classService;
