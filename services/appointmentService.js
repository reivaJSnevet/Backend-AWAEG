import appointmentRepository from "../repositories/appointmentRepository.js";

const appointmentService = {
	createAppointment: async (appointment) => {
		try {
			const newAppointment =
				await appointmentRepository.create(appointment);
			return newAppointment;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeValidationError") {
				if (error.errors) {
					error.errors.forEach((e) => {
						errors.push({
							type: "ValidationError",
							message: e.message,
							field: e.path,
						});
					});
				} else {
					errors.push({
						type: "ValidationError",
						message: error.message,
						field: error.path,
					});
				}
			} else {
				throw error;
			}
			throw errors;
		}
	},

	getAllAppointments: async () => {
		try {
			const appointments = await appointmentRepository.getAll();
			return appointments;
		} catch (error) {
			throw error;
		}
	},

	getAppointmentById: async (appointmentId) => {
		try {
			const appointment =
				await appointmentRepository.getById(appointmentId);
			return appointment;
		} catch (error) {
			throw error;
		}
	},

	updateAppointment: async (appointmentId, updatedFields) => {
		try {
			const appointmentUpdated = await appointmentRepository.update(
				appointmentId,
				updatedFields,
			);
			return appointmentUpdated;
		} catch (error) {
			const errors = [];

			if (error.name === "SequelizeValidationError") {
				const errors = [];
				error.errors.forEach((e) => {
					errors.push({
						type: "ValidationError",
						message: e.message,
						field: e.path,
					});
				});
			} else {
				throw error;
			}
			throw errors;
		}
	},

	deleteAppointment: async (appointmentId) => {
		try {
			const appointmentDeleted =
				await appointmentRepository.delete(appointmentId);
			return appointmentDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default appointmentService;
