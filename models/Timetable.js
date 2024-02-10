import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { ValidationError } from "../errors/index.js";

const Timetable = db.define(
	"Timetable",
	{
		timetableId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		day: {
			type: DataTypes.STRING(250),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El día no puede estar vacío",
				},
				isIn: {
					args: [
						["lunes", "martes", "miércoles", "jueves", "viernes"],
					],
					msg: "El día debe ser un día de la semana válido (lunes, martes, miércoles, jueves, viernes)",
				},
				set(value) {
					this.setDataValue("day", value.toLowerCase());
				},
			},
		},
		lesson: {
			type: DataTypes.ENUM(
				"I",
				"II",
				"III",
				"IV",
				"V",
				"VI",
				"VII",
				"VIII",
			),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La lección no puede estar vacía",
				},
				isIn: {
					args: [["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]],
					msg: "La lección debe ser una lección válida (I, II, III, IV, V, VI, VII, VIII)",
				},
			},
			set(value) {
				this.setDataValue("lesson", value.toUpperCase());
			},
		},
		startTime: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La hora de inicio no puede estar vacía",
				},
				isTime(value) {
					if (!value.match(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/)) {
                        throw new Error("La hora de inicio debe ser una hora válida");
					}
				},
			},
		},
		endTime: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La hora de finalización no puede estar vacía",
				},
				isTime(value) {
					if (!value.match(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/)) {
                        throw new Error("La hora de finalización debe ser una hora válida");
                    }
				},
			},
		},
	},
	{
		timestamps: false,
		hooks: {
			beforeCreate: [
				async (timetable) => {
					await avoidOverlappingClasses(timetable);
				},
				async (timetable) => {
					await validateDuration(timetable);
				},
			],
			beforeUpdate: [
				async (timetable) => {
					await avoidOverlappingClasses(timetable);
				},
                async (timetable) => {
                    await validateDuration(timetable);
                },
			],
		},
	},
);

//Hooks
const avoidOverlappingClasses = async (timetable) => {
	const { day, startTime, endTime } = timetable;

	const overlappingTimetable = await Timetable.findOne({
		where: {
			day,
			startTime: {
				[db.Sequelize.Op.between]: [startTime, endTime],
			},
			endTime: {
				[db.Sequelize.Op.between]: [startTime, endTime],
			},
		},
	});
	if (overlappingTimetable) {
		throw new ValidationError(
            "La clase se superpone con otra clase existente",
        );
	}
};

//avoid duration more tha 40 minutes
const validateDuration = async (timetable) => {
	const { startTime, endTime } = timetable;

	const startDate = new Date(`1970-01-01 ${startTime}`);
	const endDate = new Date(`1970-01-01 ${endTime}`);
	const durationInMinutes = (endDate - startDate) / (1000 * 60);

	if (durationInMinutes > 40) {
		throw new ValidationError(
            "La duración de la clase no puede ser mayor a 40 minutos",
        );
	}
};

export default Timetable;
