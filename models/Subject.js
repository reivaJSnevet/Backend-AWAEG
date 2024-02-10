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
				msg: "El nombre debe tener entre 3 y 50 caracteres",
			},
			is: {
				args: /^[a-zA-Z0-9_ .áéíóúÁÉÍÓÚüÜñÑ]+$/i,
				msg: "El nombre solo puede contener letras, números, espacios y guiones bajos",
			},
			notEmpty: {
				msg: "El nombre no puede estar vacío",
			},
		},
	},
});

export default Subject;