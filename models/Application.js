import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Application = db.define(
	"Application",
	{
		applicationId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		status: {
			type: DataTypes.ENUM("pending", "approved", "rejected"),
			allowNull: false,
			defaultValue: "pending",
			validate: {
				isIn: {
					args: [["pending", "approved", "rejected"]],
					msg: "El estado debe ser 'pending', 'approved' o 'rejected'",
				},
			},
		},
		type: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "El tipo debe tener entre 1 y 50 caracteres",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "El tipo solo puede contener letras y espacios",
				},
				notEmpty: {
					msg: "El tipo no puede estar vacío",
				},
				set(value) {
					this.setDataValue("type", value.toLowerCase());
				},
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
	},
);

export default Application;
