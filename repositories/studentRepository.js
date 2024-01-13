import {
	Student,
	Caregiver,
	Group,
	User,
	Grade,
	Subject,
	Role,
} from "../models/index.js";

const studentRepository = {
	create: async (student) => {
		try {
			const newStudent = await Student.create(student);
			return newStudent;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const students = await Student.findAll({
				include: [
					{
						model: Caregiver,
					},
					{
						model: Group,
					},
					{
						model: User,
						attributes: ["userName", "email"],
						include: [
							{
								model: Role,
							},
						],
					},
					{
						model: Grade,
						include: [
							{
								model: Subject,
							},
						],
					},
				],
			});
			return students;
		} catch (error) {
			throw error;
		}
	},

	getById: async (studentId) => {
		try {
			const student = await Student.findByPk(studentId);
			return student;
		} catch (error) {
			throw error;
		}
	},

	update: async (studentId, updatedFields) => {
		try {
			const studentUpdated = await Student.update(updatedFields, {
				where: { studentId },
			});
			return studentUpdated[0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (studentId) => {
		try {
			const studentDeleted = await Student.destroy({
				where: { studentId },
			});
			return studentDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default studentRepository;
