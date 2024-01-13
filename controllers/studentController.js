import studentService from "../services/studentService.js";

const studentController = {
    postStudent: async (req, res) => {
        try {
            const newStudent = await studentService.createStudent(
                req.body,
            );
            res.status(201).json(newStudent);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error creating student",
                    message: error.message,
                });
            }
            console.log(error)
        }
    },

    getAllStudents: async (req, res) => {
        try {
            const students = await studentService.getAllStudents();
            res.status(200).json(students);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving students",
                message: error.message,
            });
        }
    },

    getStudentById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing student ID",
                    message: "You must specify a student ID to retrieve it",
                });
            }

            const student = await studentService.getStudentById(
                req.params.id,
            );

            if (student) {
                return res.status(200).json(student);
            } else {
                return res.status(404).json({
                    error: `Student not found`,
                    message: `No student found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving student",
                message: error.message,
            });
        }
    },

    putStudent: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing student ID",
                    message: "You must specify a student ID to update it",
                });
            }

            const studentUpdated = await studentService.updateStudent(
                req.params.id,
                req.body,
            );

            if (studentUpdated) {
                return res.status(200).json({message: `student '${req.params.id}' updated`});
            } else {
                return res.status(404).json({
                    error: `Student not found`,
                    message: `No student found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                console.error(error);
                res.status(500).json({
                    error: "Error updating student",
                    message: error.message,
                });
            }
        }
    },

    deleteStudent: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing student ID",
                    message: "You must specify a student ID to delete it",
                });
            }

            const studentDeleted = await studentService.deleteStudent(
                req.params.id,
            );

            if (studentDeleted) {
                return res.status(200).json({
                    message: `Student '${req.params.id}' deleted successfully`,});
            } else {
                return res.status(404).json({
                    error: `Student not found`,
                    message: `No student found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error deleting student",
                message: error.message,
            });
        }
    },
};

export default studentController;