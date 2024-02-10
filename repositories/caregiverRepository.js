import db from "../config/db.js";
import { Person, Caregiver } from "../models/index.js";

const caregiverRepository = {
	create: async (caregiver) => {
		const t = await db.transaction();
		try {
			const newCaregiver = await Person.create(
				{ ...caregiver, type: "caregiver" },
				{
					include: [Caregiver],
					transaction: t,
				},
			);

			await t.commit();
			return newCaregiver;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	},

	getAll: async () => {
		try {
			const caregivers = await Person.findAll({
				include: [
					{
						model: Caregiver,
						required: true,
					},
				],
			});
			return caregivers;
		} catch (error) {
			throw error;
		}
	},

	getById: async (caregiverId) => {
		try {
			const caregiver = await Person.findOne({
				include: [
					{
						model: Caregiver,
						where: { personId: caregiverId },
						required: true,
					},
				],
			});
			return caregiver;
		} catch (error) {
			throw error;
		}
	},

	update: async (caregiverId, updatedFields) => {
		try {
			const caregiverUpdated = await Caregiver.update(updatedFields, {
				where: { personId: caregiverId },
                individualHooks: true,
			});
			return caregiverUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (caregiverId) => {
		try {
			const caregiverDeleted = await Person.destroy({
				where: { id: caregiverId },
			});
			return caregiverDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default caregiverRepository;
