import {
	Application,
	Functionary,
	PreRegistration,
	File,
    Person,
    Group,
    Student,
} from "../models/index.js";

const applicationRepository = {
	getAll: async () => {
		try {
			const applications = await Application.findAll({ 
                include: [
                    {
                        model: Functionary,
                        
                    },
                    {
                        model: PreRegistration,
                        include: [
                            {
                                model: Student,
                                include: [
                                    {
                                        model: Person,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: File,
                        include: [
                            {
                                model: Functionary,
                                include: [
                                    {
                                        model: Person,
                                    }
                                ]
                            }
                        ]
                    },
                ] 
            });
			return applications;
		} catch (error) {
			throw error;
		}
	},

	getById: async (applicationId) => {
		try {
			const application = await Application.findByPk(applicationId);
			return application;
		} catch (error) {
			throw error;
		}
	},

	getByType: async (type) => {
		try {
			const applications = await Application.findAll({
				where: { type },
				include: `${type}`,
			});
			return applications;
		} catch (error) {
			throw error;
		}
	},

    update: async (applicationId, applicationData) => {
        try {
            const application = await Application.update(applicationData, {
                where: { applicationId },
                returning: true,
            });
            return application[1][0];
        } catch (error) {
            throw error;
        }
    },
};

export default applicationRepository;
