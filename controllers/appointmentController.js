import appointmentService from "../services/appointmentService.js";

const appointmentController = {
	postAppointment: async (req, res, next) => {
		try {
			const newAppointment = await appointmentService.createAppointment(
				req.body,
			);
			res.status(201).json(newAppointment);
		} catch (error) {
			next(error);
		}
	},
	getAllAppointments: async (req, res, next) => {
		try {
			const appointments = await appointmentService.getAllAppointments();
			res.status(200).json(appointments);
		} catch (error) {
			next(error);
		}
	},
	getAppointmentById: async (req, res, next) => {
		try {
			const appointment = await appointmentService.getAppointmentById(
				req.params.id,
			);
			res.status(200).json(appointment);
		} catch (error) {
			next(error);
		}
	},
    getAppointmentsByFunctionaryId: async (req, res, next) => {
        try {
            const appointments = await appointmentService.getAppointmentsByFunctionaryId(
                req.params.id
            );
            res.status(200).json(appointments);
        } catch (error) {
            next(error);
        }
    },
	putAppointment: async (req, res, next) => {
		try {
			const appointment = await appointmentService.updateAppointment(
				req.params.id,
				req.body,
			);
			res.status(200).json(appointment);
		} catch (error) {
			next(error);
		}
	},
	deleteAppointment: async (req, res, next) => {
		try {
			const appointment =
				await appointmentService.deleteAppointment(req.params.id);
			return res.status(200).json(appointment);
		} catch (error) {
			next(error);
		}
	},
};

export default appointmentController;
