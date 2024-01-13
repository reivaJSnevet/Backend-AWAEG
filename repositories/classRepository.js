import { Class, Subject, Timetable, Functionary } from "../models/index.js";
import db from "../config/db.js";

const classRepository = {
	create: async (classData, timetablesData = []) => {
        const t = await db.transaction();
		try {
            
			const createdClass = await Class.create(classData, {
				transaction: t,
			});

			await Promise.all(
				timetablesData.map(async (timetable) => {
					await createdClass.createTimetable(timetable, {
						transaction: t,
					});
				}),
			);

			await t.commit();

			console.log("Successful operation");
			return createdClass;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	},

	findAll: async () => {
		try {
			const classes = await Class.findAll({
				include: [
					{
						model: Timetable,
					},
					{
						model: Subject,
					},
                    {
                        model: Functionary,
                    },
				],
			});
			return classes;
		} catch (error) {
			throw error;
		}
	},

	findById: async (classId) => {
		try {
			const foundClass = await Class.findByPk(classId);
			return foundClass;
		} catch (error) {
			throw error;
		}
	},

	update: async (classId, classData) => {
		try {
			const updatedClass = await Class.update(classData, {
				where: { classId },
			});
			return updatedClass[0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (classId) => {
		try {
			const deletedClass = await Class.destroy({
				where: { classId },
			});
			return deletedClass;
		} catch (error) {
			throw error;
		}
	},

	addDay: async (classId, daysId) => {
		try {
			const foundClass = await Class.findByPk(classId);
			await foundClass.addDays(daysId);
			return foundClass;
		} catch (error) {
			throw error;
		}
	},

	deleteDay: async (classId, daysId) => {
		try {
			const foundClass = await Class.findByPk(classId);
			await foundClass.removeDays(daysId);
			return foundClass;
		} catch (error) {
			throw error;
		}
	},
};

export default classRepository;
