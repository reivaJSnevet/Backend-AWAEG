import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Class from "./Class.js";

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
					msg: "The day can't be empty",
				},
				isIn: {
					args: [
						["lunes", "martes", "miércoles", "jueves", "viernes"],
					],
					msg: "The day must be a weekday",
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
					msg: "The lesson can't be empty",
				},
				isIn: {
					args: [["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]],
					msg: "The lesson must be a valid roman number between I and VIII",
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
					msg: "The start time can't be empty",
				},
				isTime(value) {
					if (!value.match(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/)) {
						throw new Error("The start time must be a valid time");
					}
				},
			},
		},
		endTime: {
			type: DataTypes.TIME,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The end time can't be empty",
				},
				isTime(value) {
					if (!value.match(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/)) {
						throw new Error("The end time must be a valid time");
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
		const OverlappingError = new Error(
			"The timetable overlaps with another timetable",
		);
		OverlappingError.name = "OverlappingError";
		throw OverlappingError;
	}
};

//avoid duration more tha 40 minutes
const validateDuration = async (timetable) => {
	const { startTime, endTime } = timetable;

	const startDate = new Date(`1970-01-01 ${startTime}`);
	const endDate = new Date(`1970-01-01 ${endTime}`);
	const durationInMinutes = (endDate - startDate) / (1000 * 60);

	if (durationInMinutes > 40) {
		const DurationError = new Error(
			"The duration of the class can't be more than 40 minutes",
		);
		DurationError.name = "DurationError";
		throw DurationError;
	}
};

export default Timetable;
