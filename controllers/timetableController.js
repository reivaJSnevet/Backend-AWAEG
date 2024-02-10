import timetableService from "../services/timetableService.js";

const timetableController = {
	postTimeTable: async (req, res, next) => {
		try {
			const timetable = req.body;
			const newTimetable =
				await timetableService.createTimetable(timetable);
			res.status(201).json(newTimetable);
		} catch (error) {
			next(error);
		}
	},
	getTimeTables: async (req, res, next) => {
		try {
			const timetables = await timetableService.getAllTimetables();
			res.status(200).json(timetables);
		} catch (error) {
			next(error);
		}
	},
	getTimeTableById: async (req, res, next) => {
		try {
			const timetableId = req.params.id;
			const timetable =
				await timetableService.getTimetableById(timetableId);

			res.status(200).json(timetable);
		} catch (error) {
			next(error);
		}
	},
	updateTimeTable: async (req, res, next) => {
		try {
			const timetableId = req.params.id;
			const timetableData = req.body;
			const timetable = await timetableService.updateTimetable(
				timetableId,
				timetableData,
			);
			req.status(200).json(timetable);
		} catch (error) {
			next(error);
		}
	},
	deleteTimeTable: async (req, res, next) => {
		try {
			const timetableId = req.params.id;
			const timetable =
				await timetableService.deleteTimetable(timetableId);
			res.status(200).json(timetable);
		} catch (error) {
			next(error);
		}
	},
};

export default timetableController;
