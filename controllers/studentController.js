import studentService from "../services/studentService.js";

const studentController = {
	postStudent: async (req, res, next) => {
		try {
			const newStudent = await studentService.createStudent(req.body);
			res.status(201).json(newStudent);
		} catch (error) {
			next(error);
		}
	},
	getAllStudents: async (req, res, next) => {
		try {
			const students = await studentService.getAllStudents();
			res.status(200).json(students);
		} catch (error) {
			next(error);
		}
	},
	getStudentById: async (req, res, next) => {
		try {
			const student = await studentService.getStudentById(req.params.id);
			res.status(200).json(student);
		} catch (error) {
			next(error);
		}
	},
	putStudent: async (req, res, next) => {
		try {
			const student = await studentService.updateStudent(
				req.params.id,
				req.body,
			);
			res.status(200).json(student);
		} catch (error) {
			next(error);
		}
	},

	deleteStudent: async (req, res, next) => {
		try {
			const student = await studentService.deleteStudent(req.params.id);
			res.status(200).json(student);
		} catch (error) {
			next(error);
		}
	},
};

export default studentController;
