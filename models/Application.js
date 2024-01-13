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
					msg: "The status must be pending, approved or rejected",
				},
			},
		},
		type: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The type must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The type can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The type can't be empty",
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
		defaultScope: {
			attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
		},
	},
);

export default Application;
