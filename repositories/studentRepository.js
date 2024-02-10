import db from "../config/db.js";
import {
	Student,
	Person,
	Caregiver,
	Group,
	User,
	Grade,
	Subject,
	Role,
} from "../models/index.js";

const studentRepository = {
	create: async (student) => {
		const t = await db.transaction();
		try {
			const newStudent = await Person.create(
				{ ...student, type: "student" },
				{
					include: [Student],
					transaction: t,
				},
			);

			await t.commit();
			return newStudent;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	},

	getAll: async () => {
		try {
			const students = await Person.findAll({
				include: [
					{
						model: User,
						include: [Role],
					},
					{
						model: Student,
						required: true,
						include: [
							{
								model: Caregiver,
								include: [Person],
							},
							{
								model: Grade,
								include: [Subject],
							},
							{
								model: Group,
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
			const student = await Person.findOne({
				where: { id: studentId },
				include: [
					{
						model: User,
						include: [Role],
					},
					{
						model: Student,
						required: true,
						include: [
							{
								model: Caregiver,
								include: [Person],
							},
							{
								model: Grade,
								include: [Subject],
							},
							{
								model: Group,
							},
						],
					},
				],
			});
			return student;
		} catch (error) {
			throw error;
		}
	},

	update: async (studentId, updatedFields) => {
		try {
			const studentUpdated = await Student.update(updatedFields, {
				where: { personId: studentId },
				individualHooks: true,
			});
			return studentUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (studentId) => {
		try {
			const studentDeleted = await Person.destroy({
				where: { id: studentId },
			});
			return studentDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default studentRepository;
