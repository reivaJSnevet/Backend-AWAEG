import appointmentService from "../services/appointmentService.js";

const appointmentController = {
	postAppointment: async (req, res) => {
		try {
			const newAppointment = await appointmentService.createAppointment(
				req.body,
			);
			res.status(201).json(newAppointment);
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				res.status(500).json({
					error: "Error creating appointment",
					message: error.message,
				});
			}
		}
	},

	getAllAppointments: async (req, res) => {
		try {
			const appointments = await appointmentService.getAllAppointments();
			res.status(200).json(appointments);
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving appointments",
				message: error.message,
			});
		}
	},

	getAppointmentById: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing appointment ID",
					message:
						"You must specify an appointment ID to retrieve it",
				});
			}

			const appointment = await appointmentService.getAppointmentById(
				req.params.id,
			);

			if (appointment) {
				return res.status(200).json(appointment);
			} else {
				return res.status(404).json({
					error: `Appointment not found`,
					message: `No appointment found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error retrieving appointment",
				message: error.message,
			});
		}
	},

	putAppointment: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing appointment ID",
					message: "You must specify an appointment ID to update it",
				});
			}

			const appointmentUpdated =
				await appointmentService.updateAppointment(
					req.params.id,
					req.body,
				);

			if (appointmentUpdated) {
				return res.status(200).json({message: `appointment '${req.params.id}' updated`});
			} else {
				return res.status(404).json({
					error: `Appointment not found`,
					message: `No appointment found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			if (Array.isArray(error)) {
				return res.status(400).json({ error });
			} else {
				console.error(error);
				res.status(500).json({
					error: "Error updating appointment",
					message: error.message,
				});
			}
		}
	},

	deleteAppointment: async (req, res) => {
		try {
			if (!req.params.id) {
				return res.status(400).json({
					error: "Missing appointment ID",
					message: "You must specify an appointment ID to delete it",
				});
			}

			const appointmentDeleted =
				await appointmentService.deleteAppointment(req.params.id);

			if (appointmentDeleted) {
				return res.status(200).json(appointmentDeleted);
			} else {
				return res.status(404).json({
					error: `Appointment not found`,
					message: `No appointment found with ID '${req.params.id}'`,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: "Error deleting appointment",
				message: error.message,
			});
		}
	},
};

export default appointmentController;
