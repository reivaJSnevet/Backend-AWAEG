import classRepository from "../repositories/classRepository.js";

const classService = {
	createClass: async (classData) => {
		try {

            const {Timetables, shift, subjectId} = classData;

			const newClass = await classRepository.create({shift, subjectId},Timetables);
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

	addDay: async (classId, daysId) => {
		try {
			const foundClass = await classRepository.findById(classId);

			if (!foundClass || !daysId) {
				return null;
			} else if (await foundClass.hasDay(daysId)) {
				return { message: "Class already has this day" };
			}

			return await classRepository.addDay(classId, daysId);
		} catch (error) {
			throw error;
		}
	},

    deleteDay: async (classId, daysId) => {
        try {
            const foundClass = await classRepository.findById(classId);

            if (!foundClass || !daysId) {
                return null;
            } else if (!await foundClass.hasDay(daysId)) {
                return null
            }

            return await classRepository.deleteDay(classId, daysId);
        } catch (error) {
            throw error;
        }
    }
};

export default classService;
