import studentRepository from "../repositories/studentRepository.js";
import personRepository from "../repositories/personRepository.js";
import { NotFoundError, ValidationError } from "../errors/index.js";

const studentService = {
	createStudent: async (student) => {
		try {
			if(!student.Student){
                throw new ValidationError("Student object is required");
            }

            const person = await personRepository.getById(student.Student.caregiverId);
            if(!person){
                throw new NotFoundError("Student", student.Student.caregiverId);
            }

            student.Student.caregiverId = person.Caregiver.caregiverId;
			const newStudent = await studentRepository.create(student);

			return newStudent;
		} catch (error) {
			throw error;
        }
	},

	getAllStudents: async () => {
		try {
			const students = await studentRepository.getAll();
			return students;
		} catch (error) {
			throw error;
		}
	},

	getStudentById: async (studentId) => {
		try {
			const student = await studentRepository.getById(studentId);
            if (!student) {
                throw new NotFoundError("Student", studentId);
            }

			return student;
		} catch (error) {
			throw error;
		}
	},

	updateStudent: async (studentId, updatedFields) => {
		try {	
            const person = await personRepository.update(studentId, updatedFields);
            const student = await studentRepository.update(studentId, updatedFields);
            if(!person && !student){
                throw new NotFoundError("Student", studentId);
            }

            const personJSON = {
                ...person.toJSON(),
                Student: student,
            };

			return personJSON;
		} catch (error) {
			throw error;
		}
	},

	deleteStudent: async (studentId) => {
		try {
			const studentDeleted = await studentRepository.delete(studentId);
            if (!studentDeleted) {
                throw new NotFoundError("Student", studentId);
            }
            
			return studentDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default studentService;
