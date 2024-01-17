import studentSupplieService from "../services/studentSupplieService.js";

const studentSupplieController = {
    postStudentSupplie: async (req, res) => {
        try {
            const newStudentSupplie = await studentSupplieService.createStudentSupplie(
                req.body,
            );
            res.status(201).json(newStudentSupplie);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error creating studentSupplie",
                    message: error.message,
                });
            }
            console.log(error)
        }
    },

    getAllStudentSupplies: async (req, res) => {
        try {
            const studentSupplies = await studentSupplieService.getAllStudentSupplies();
            res.status(200).json(studentSupplies);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving studentSupplies",
                message: error.message,
            });
        }
    },

    getStudentSupplieById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing studentSupplie ID",
                    message: "You must specify a studentSupplie ID to retrieve it",
                });
            }

            const studentSupplie = await studentSupplieService.getStudentSupplieById(
                req.params.id,
            );

            if (studentSupplie) {
                return res.status(200).json(studentSupplie);
            } else {
                return res.status(404).json({
                    error: `StudentSupplie not found`,
                    message: `No studentSupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving studentSupplie",
                message: error.message,
            });
        }
    },

    putStudentSupplie: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing studentSupplie ID",
                    message: "You must specify a studentSupplie ID to update it",
                });
            }

            const updatedStudentSupplie = await studentSupplieService.updateStudentSupplie(
                req.params.id,
                req.body,
            );

            if (updatedStudentSupplie) {
                return res.status(200).json(updatedStudentSupplie);
            } else {
                return res.status(404).json({
                    error: `StudentSupplie not found`,
                    message: `No studentSupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error updating studentSupplie",
                    message: error.message,
                });
            }
        }
    },

    deleteStudentSupplie: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing studentSupplie ID",
                    message: "You must specify a studentSupplie ID to delete it",
                });
            }

            const deletedStudentSupplie = await studentSupplieService.deleteStudentSupplie(
                req.params.id,
            );

            if (deletedStudentSupplie) {
                return res.status(200).json(deletedStudentSupplie);
            } else {
                return res.status(404).json({
                    error: `StudentSupplie not found`,
                    message: `No studentSupplie found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error deleting studentSupplie",
                message: error.message,
            });
        }
    },
};

export default studentSupplieController;