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
					msg: "El nombre debe tener entre 3 y 50 caracteres",
				},
				is: {
					args: /^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "El nombre solo puede contener letras, números, espacios y guiones bajos",
				},
				notEmpty: {
					msg: "El nombre no puede estar vacío",
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
					msg: "El nivel de privilegio debe ser un número entero",
				},
				isIn: {
					args: [[1, 2, 3, 4, 5]],
					msg: "El nivel de privilegio debe estar entre 1 y 5",
				},
			},
		},
		description: {
            trim: true,
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La descripción no puede estar vacía",
				},
				len: {
					args: [0, 255],
					msg: "La descripción debe tener como máximo 255 caracteres",
				},
				is: {
					args: /^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "La descripción solo puede contener letras, números, espacios y guiones bajos",
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
