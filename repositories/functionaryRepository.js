import db from "../config/db.js";
import {
	Person,
	Functionary,
	User,
	Subject,
	Group,
	Role,
	Class,
	Appointment,
	Loan,
	File,
	Application,
} from "../models/index.js";

const functionaryRepository = {
	create: async (functionary) => {
		const t = await db.transaction();
		try {
			const newFunctionary = await Person.create(
				{ ...functionary, type: "functionary" },
				{
					include: [Functionary],
					transaction: t,
				},
			);

			await t.commit();
			return newFunctionary;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	},

	getAll: async () => {
		try {
			const functionaries = await Person.findAll({
				include: [
					{
						model: User,
						include: [Role],
					},
					{
						model: Functionary,
						required: true,
						include: [
							{
								model: Subject,
								attributes: ["subjectId", "subjectName"],
								through: { attributes: [] },
							},
							{ model: Group },
							{ model: Class },
							{ model: Appointment },
							{ model: File },
							{ model: Application },
						],
					},
					{
						model: Loan,
						as: "Debtor",
					},
				],
			});

			return functionaries;
		} catch (error) {
			throw error;
		}
	},

	getById: async (functionaryId) => {
		try {
			const functionary = await Person.findOne({
				where: { id: functionaryId },
				include: [
					{
						model: User,
						include: [Role],
					},
					{
						model: Functionary,
						required: true,
						include: [
							{
								model: Subject,
								attributes: ["subjectId", "subjectName"],
								through: { attributes: [] },
							},
							{ model: Group },
							{ model: Class },
							{ model: Appointment },
							{ model: File },
							{ model: Application },
						],
					},
					{
						model: Loan,
						as: "Debtor",
					},
				],
				exclude: ["createdAt", "updatedAt", "deleteAt"],
			});
			return functionary;
		} catch (error) {
			throw error;
		}
	},

	update: async (functionaryId, updatedFields) => {
		try {
			const functionaryUpdated = await Functionary.update(updatedFields, {
				where: { personId: functionaryId },
				individualHooks: true,
			});
			return functionaryUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (functionaryId) => {
		try {
			const functionaryDeleted = await Person.destroy({
				where: { id: functionaryId },
			});
			return functionaryDeleted;
		} catch (error) {
			throw error;
		}
	},

	addSubjects: async (functionaryId, subjectsIds) => {
		try {
			const functionary = await Functionary.findOne({
				where: { personId: functionaryId },
			});
			await functionary.addSubjects(subjectsIds);
			return functionary;
		} catch (error) {
			throw error;
		}
	},

	deleteSubjects: async (functionaryId, subjectsIds) => {
		try {
			const functionary = await Functionary.findOne({
				where: { personId: functionaryId },
			});
			await functionary.removeSubjects(subjectsIds);
			return functionary;
		} catch (error) {
			throw error;
		}
	},
};

export default functionaryRepository;
