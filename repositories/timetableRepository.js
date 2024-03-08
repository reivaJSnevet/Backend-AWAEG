import { Timetable } from "../models/index.js";

const timetableRepository = {
	create: async (timetables) => {
		try {
			const newTimetable = timetables.map((timetable) => {
                return Timetable.create(timetable);
            });
			return newTimetable;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const timetables = await Timetable.findAll();
			return timetables;
		} catch (error) {
			throw error;
		}
	},

	getById: async (timetableId) => {
		try {
			const timetable = await Timetable.findByPk(timetableId);
			return timetable;
		} catch (error) {
			throw error;
		}
	},

	update: async (timetableId, timetableData) => {
		try {
			const updatedTimetable = await Timetable.update(timetableData, {
				where: { timetableId },
                individualHooks: true,
			});
			return updatedTimetable[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (timetableId) => {
		try {
			const deletedTimetable = await Timetable.destroy({
				where: { timetableId: timetableId },
			});
			return deletedTimetable;
		} catch (error) {
			throw error;
		}
	},
};

export default timetableRepository;
