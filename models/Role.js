import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Role = db.define(
	"Role",
	{
		roleId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		roleName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
			validate: {
				len: {
					args: [3, 50],
					msg: "The name must be between 3 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The name can only contain letters, numbers, spaces, and underscores",
				},
				notEmpty: {
					msg: "The name can't be empty",
				},
			},
            set(value) {
                this.setDataValue("roleName", value.toLowerCase());
            }
		},
		privilegeLevel: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: {
					msg: "The privilege level must be an integer",
				},
				isIn: {
					args: [[1, 2, 3, 4, 5]],
					msg: "The privilege level must be between 1 and 5",
				},
			},
		},
		description: {
            trim: true,
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The description can't be empty",
				},
				len: {
					args: [0, 255],
					msg: "The description has a maximum of 255 characters",
				},
				is: {
					args: /^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The description can only contain letters, numbers, spaces, and underscores",
				},
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        }
	},
);

export default Role;
