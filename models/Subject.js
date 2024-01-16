import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Subject = db.define("Subject", {
	subjectId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},

	subjectName: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
		validate: {
			len: {
				args: [3, 50],
				msg: "The name must be between 3 and 50 characters long",
			},
			is: {
				args: /^[a-zA-Z0-9_ .áéíóúÁÉÍÓÚüÜñÑ]+$/i,
				msg: "The name can only contain letters, numbers, spaces, and underscores",
			},
			notEmpty: {
				msg: "The name can't be empty",
			},
		},
	},
});

export default Subject;
