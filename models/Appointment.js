import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { ValidationError } from "../errors/index.js";

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
					msg: "La fecha no puede estar vacía",
				},
				isDate: {
					msg: "La fecha debe ser una fecha válida",
				},
				isAfter: {
					args: new Date().toDateString(),
					msg: "La fecha no puede ser anterior a hoy",
				},
			},
		},
		hour: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La hora no puede estar vacía",
				},
				isTime(value) {
					if (!value.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
						throw new ValidationError("La hora debe ser una hora válida");
					}
				},
				isBetween(value) {
					if (value < "08:00" || value > "15:00") {
						throw new ValidationError(
                            "La hora debe estar entre las 08:00 y las 15:00",
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
					msg: "La duración no puede estar vacía",
				},
				isInt: {
					msg: "La duración debe ser un número entero",
				},
				min: {
					args: [15],
					msg: "La duración no puede ser menor a 15 minutos",
				},
				max: {
					args: [60],
					msg: "La duración no puede ser mayor a 60 minutos",
				},
			},
		},
		location: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "La ubicación no puede tener más de 50 caracteres",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ,:"-]+$/i,
					msg: "La ubicación solo puede contener letras, espacios, comas, guiones y comillas dobles",
				},
				notEmpty: {
					msg: "La ubicación no puede estar vacía",
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
					msg: "La descripción no puede tener más de 255 caracteres",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ-]+$/i,
					msg: "La descripción solo puede contener letras, espacios y guiones",
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
					msg: "El estado no es válido, los valores válidos son: available, booked, cancelled, completed, expired",
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
			throw new ValidationError(
                `No se puede agendar una cita en esta fecha y hora, hay un conflicto con otra cita ${appointment2.date} ${appointment2.hour}`,
            );
		} else if (dateEnd >= dateStart2 && dateEnd <= dateEnd2) {
			throw new ValidationError(
                `No se puede agendar una cita en esta fecha y hora, hay un conflicto con otra cita ${appointment2.date} ${appointment2.hour}`,
            );
		}
	});
};
//
