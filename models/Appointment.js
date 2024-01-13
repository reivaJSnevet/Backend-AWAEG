import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Appointment = db.define(
	"Appointment",
	{
		AppointmentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The date can't be empty",
				},
				isDate: {
					msg: "The date must be a valid date",
				},
				isAfter: {
					args: new Date().toDateString(),
					msg: "The date must be after today",
				},
			},
		},
		hour: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The hour can't be empty",
				},
				isTime(value) {
					if (!value.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
						throw new Error("The hour must be in the format HH:MM");
					}
				},
				isBetween(value) {
					if (value < "08:00" || value > "15:00") {
						throw new Error(
							"The hour must be between 08:00 and 18:00 (8am and 5pm)",
						);
					}
				},
			},
		},
		duration: {
			//duration in minutes
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The duration can't be empty",
				},
				isInt: {
					msg: "The duration must be an integer",
				},
				min: {
					args: [15],
					msg: "The duration can't be less than 15 minutes",
				},
				max: {
					args: [60],
					msg: "The duration can't be more than 60 minutes (1 hour)",
				},
			},
		},
		location: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The location must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ,:"-]+$/i,
					msg: "The location can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The location can't be empty",
				},
				set(value) {
					this.setDataValue("location", value.toLowerCase());
				},
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: {
					args: [0, 255],
					msg: "The description can't be more than 255 characters long",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ-]+$/i,
					msg: "The description can only contain letters and spaces",
				},
			},
		},
		status: {
			type: DataTypes.ENUM(
				"available",
				"booked",
				"cancelled",
				"completed",
				"expired",
			),
			allowNull: false,
			defaultValue: "available",
			validate: {
				isIn: {
					args: [
						[
							"available",
							"booked",
							"cancelled",
							"completed",
							"expired",
						],
					],
					msg: "The status must be available, booked, cancelled, completed or expired",
				},
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
		defaultScope: {
			attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
		},
		scopes: {
			allAssociations: {
				include: [{ all: true, nested: true }],
			},
		},
		hooks: {
			beforeCreate: async (appointment) => {
				await avoidConflict(appointment);
			},
		},
	},
);

export default Appointment;

//Hooks

const avoidConflict = async (appointment) => {
	const { date, hour, duration, functionaryId } = appointment;
	const dateStart = new Date(`${date} ${hour}`);
	const dateEnd = new Date(dateStart.getTime() + duration * 60000);

	const appointments = await Appointment.findAll({
		where: { date, functionaryId },
	});

	appointments.map((appointment2) => {
		const dateStart2 = new Date(
			`${appointment2.date} ${appointment2.hour}`,
		);
		const dateEnd2 = new Date(
			dateStart2.getTime() + appointment2.duration * 60000,
		);

		if (dateStart >= dateStart2 && dateStart <= dateEnd2) {
			const error = new Error(
				`You can not book an appointment on this date and hour, there is a conflict with another appointment ${appointment2.date} ${appointment2.hour}`,
			);
			error.name = "SequelizeValidationError";
			throw error;
		} else if (dateEnd >= dateStart2 && dateEnd <= dateEnd2) {
			const error = new Error(
				`You can not book an appointment on this date and hour, there is a conflict with another appointment ${appointment2.date} ${appointment2.hour}`,
			);
			error.name = "SequelizeValidationError";
			throw error;
		}
	});
};
//
