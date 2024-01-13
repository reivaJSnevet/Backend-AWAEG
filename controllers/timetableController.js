import timetableService from "../services/timetableService.js";

const timetableController = {
    postTimeTable: async (req, res) => {
        try {
            const timetable = req.body;
            const newTimetable = await timetableService.createTimetable(timetable);
            res.status(201).json(newTimetable);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getTimeTables: async (req, res) => {
        try {
            const timetables = await timetableService.getAllTimetables();
            res.status(200).json(timetables);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getTimeTableById: async (req, res) => {
        try {
            const timetableId = req.params.id;
            const timetable = await timetableService.getTimetableById(timetableId);
            if (timetable) {
                res.status(200).json(timetable);
            } else {
                res.status(404).json({ message: "Timetable not found!" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateTimeTable: async (req, res) => {
        try {
            const timetableId = req.params.id;
            const timetableData = req.body;
            const updatedTimetable = await timetableService.updateTimetable(timetableId, timetableData);
            if (updatedTimetable) {
                res.status(200).json(updatedTimetable);
            } else {
                res.status(404).json({ message: "Timetable not found!" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteTimeTable: async (req, res) => {
        try {
            const timetableId = req.params.id;
            const deletedTimetable = await timetableService.deleteTimetable(timetableId);
            if (deletedTimetable) {
                res.status(200).json(deletedTimetable);
            } else {
                res.status(404).json({ message: "Timetable not found!" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};

export default timetableController;