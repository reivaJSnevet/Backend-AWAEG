import subjectService from "../services/subjectService.js";

const subjectController = {
    postSubject: async (req, res) => {
        try {
            const newSubject = await subjectService.createSubject(req.body);
            res.status(201).json(newSubject);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "error creating subject",
                    message: error.message,
                });
            }
        }
    },

    getAllSubjects: async (req, res) => {
        try {
            const subjects = await subjectService.getAllSubjects();
            res.status(200).json(subjects);
        } catch (error) {
            res.status(500).json({
                error: "error getting all subjects",
                message: error.message,
            });
        }
    },

    getSubjectById: async (req, res) => {
        try {
            if (!req.params.subjectId) {
                return res.status(400).json({
                    error: "missing subject subjectId",
                    message: "You must provide a subject subjectId to get subject",
                });
            }

            const subject = await subjectService.getSubjectById(
                req.params.subjectId,
            );

            if (subject) {
                return res.status(200).json(subject);
            } else {
                return res.status(404).json({
                    error: "subject not found",
                    message: `There is no subject with subjectId ${req.params.subjectId}`,
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "error getting subject by subjectId",
                message: error.message,
            });
        }
    },

    putSubject: async (req, res) => {
        try {
            if (!req.params.subjectId) {
                return res.status(400).json({
                    error: "missing subject subjectId",
                    message: "You must provide a subject subjectId to update subject",
                });
            }

            const subjectUpdated = await subjectService.updateSubject(
                req.params.subjectId,
                req.body,
            );

            if (subjectUpdated) {
                return res.status(200).json({
                    message: `subject '${req.params.subjectId}' updated`,
                });
            } else {
                return res.status(404).json({
                    error: "subject not found",
                    message: `There is no subject with subjectId ${req.params.subjectId}`,
                });
            }
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "error updating subject",
                    message: error.message,
                });
            }
        }
    },

    deleteSubject: async (req, res) => {
        try {
            if (!req.params.subjectId) {
                return res.status(400).json({
                    error: "missing subject subjectId",
                    message: "You must provide a subject subjectId to delete subject",
                });
            }

            const subjectDeleted = await subjectService.deleteSubject(
                req.params.subjectId,
            );

            if (subjectDeleted) {
                return res.status(200).json({
                    message: `Subject with subjectId ${req.params.subjectId} deleted`,
                });
            } else {
                return res.status(404).json({
                    error: "subject not found",
                    message: `There is no subject with subjectId ${req.params.subjectId}`,
                });
            }
        } catch (error) {
            res.status(500).json({
                error: "error deleting subject",
                message: error.message,
            });
        }
    },

}

export default subjectController;