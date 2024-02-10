import caregiverRepository from "../repositories/caregiverRepository.js";
import personRepository from "../repositories/personRepository.js";
import { NotFoundError, ValidationError } from "../errors/index.js";

const caregiverService = {
	createCaregiver: async (caregiver) => {
		try {
			if (!caregiver.Caregiver) {
				throw new ValidationError("Caregiver object is required");
			}

			const newCaregiver = await caregiverRepository.create(caregiver);
			return newCaregiver;
		} catch (error) {
			throw error;
		}
	},

	getAllCaregivers: async () => {
		try {
			const caregivers = await caregiverRepository.getAll();
			return caregivers;
		} catch (error) {
			throw error;
		}
	},

	getCaregiverById: async (caregiverId) => {
		try {
			const caregiver = await caregiverRepository.getById(caregiverId);
			if (!caregiver) {
				throw new NotFoundError("Caregiver", caregiverId);
			}

			return caregiver;
		} catch (error) {
			throw error;
		}
	},

	updateCaregiver: async (caregiverId, updatedFields) => {
		try {
			const person = await personRepository.update(
				caregiverId,
				updatedFields,
			);
			const caregiver = await caregiverRepository.update(
				caregiverId,
				updatedFields,
			);

			if (!person && !caregiver) {
				throw new NotFoundError("Caregiver", caregiverId);
			}

            const personJSON = {
                ...person.toJSON(),
                Caregiver: caregiver,
            };
    
            return personJSON;
		} catch (error) {
			throw error;
		}
	},

	deleteCaregiver: async (caregiverId) => {
		try {
			const caregiverDeleted =
				await caregiverRepository.delete(caregiverId);

			if (!caregiverDeleted) {
				throw new NotFoundError("Caregiver", caregiverId);
			}

			return caregiverDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default caregiverService;
