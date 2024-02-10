import appointmentRepository from "../repositories/appointmentRepository.js";
import { NotFoundError } from "../errors/index.js";

const appointmentService = {
	createAppointment: async (appointment) => {
		try {
			const newAppointment =
				await appointmentRepository.create(appointment);
			return newAppointment;
		} catch (error) {
			throw error;
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

            if (!appointment) {
                throw new NotFoundError("Appointment", appointmentId);
            }

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

            if (!appointmentUpdated) {
                throw new NotFoundError("Appointment", appointmentId);
            }

			return appointmentUpdated;
		} catch (error) {
			throw error;
		}
	},

	deleteAppointment: async (appointmentId) => {
		try {
			const appointmentDeleted =
				await appointmentRepository.delete(appointmentId);

            if (!appointmentDeleted) {
                throw new NotFoundError("Appointment", appointmentId);
            }
            
			return appointmentDeleted;
		} catch (error) {
			throw error;
		}
	},
};

export default appointmentService;
