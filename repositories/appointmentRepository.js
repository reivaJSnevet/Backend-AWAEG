import { Appointment, Student, Functionary, Person } from "../models/index.js";

const appointmentRepository = {
	create: async (appointment) => {
		try {
			const newAppointment = await Appointment.create(appointment);
			return newAppointment;
		} catch (error) {
			throw error;
		}
	},

	getAll: async () => {
		try {
			const appointments = await Appointment.findAll({
				where: { studentId: null },
				include: [
					{
						model: Functionary,
						include: [
							{
								model: Person,
							},
						],
					},
				],
			});
			return appointments;
		} catch (error) {
			throw error;
		}
	},

	getById: async (appointmentId) => {
		try {
			const appointment = await Appointment.findAll({
				where: { studentId: appointmentId },
                include: [
                    {
                        model: Student,
                        include: [
                            {
                                model: Person,
                            },
                        ],
                    },
                    {
                        model: Functionary,
                        include: [
                            {
                                model: Person,
                            },
                        ],
                    }
                ],
			});
			return appointment;
		} catch (error) {
			throw error;
		}
	},

	getByFunctionaryId: async (functionaryId) => {
		try {
			const appointment = await Appointment.findAll({
				where: { functionaryId },
                include: [
                    {
                        model: Student,
                        include: [
                            {
                                model: Person,
                            },
                        ],
                    },
                    {
                        model: Functionary,
                        include: [
                            {
                                model: Person,
                            },
                        ],
                    }
                ],
			});
			return appointment;
		} catch (error) {
			throw error;
		}
	},

	update: async (appointmentId, updatedFields) => {
		try {
			const appointmentUpdated = await Appointment.update(updatedFields, {
				where: { appointmentId },
				individualHooks: true,
			});

			return appointmentUpdated[1][0];
		} catch (error) {
			throw error;
		}
	},

	delete: async (appointmentId) => {
		try {
			const appointmentDeleted = await Appointment.destroy({
				where: { appointmentId },
			});
			return appointmentDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default appointmentRepository;
