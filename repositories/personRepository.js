import { Person } from "../models/index.js";

const personRepository = {
	getAll: async () => {
		try {
			const persons = await Person.findAll({
				include: {
					all: true,
				},
			});
			return persons;
		} catch (error) {
			throw error;
		}
	},
	getById: async (personId) => {
		try {
			const person = await Person.findByPk(personId, {
				include: {
					all: true,
				},
			});
			return person;
		} catch (error) {
			throw error;
		}
	},
    update: async (personId, updatedFields) => {
        try {
            const personUpdated = await Person.update(updatedFields, {
                where: { id: personId },
                individualHooks: true,
            });
            return personUpdated[1][0];
        } catch (error) {
            throw error;
        }
    },
};

export default personRepository;
