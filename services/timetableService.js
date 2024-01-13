import timetableRepository from "../repositories/timetableRepository.js";

const timetableService = {
    createTimetable: async (timetable) => {
        try {
            const newTimetable = await timetableRepository.create(timetable);
            return newTimetable;
        } catch (error) {
            throw error;
        }
    },

    getAllTimetables: async () => {
        try {
            const timetables = await timetableRepository.getAll();
            return timetables;
        } catch (error) {
            throw error;
        }
    },

    getTimetableById: async (timetableId) => {
        try {
            const timetable = await timetableRepository.getById(timetableId);
            return timetable;
        } catch (error) {
            throw error;
        }
    },

    updateTimetable: async (timetableId, timetableData) => {
        try {
            const updatedTimetable = await timetableRepository.update(timetableId, timetableData);
            return updatedTimetable;
        } catch (error) {
            throw error;
        }
    },

    deleteTimetable: async (timetableId) => {
        try {
            const deletedTimetable = await timetableRepository.delete(timetableId);
            return deletedTimetable;
        } catch (error) {
            throw error;
        }
    },
}

export default timetableService;