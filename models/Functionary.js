import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";
import calculateAge from "../hooks/calculateAgeHook.js";

const Functionary = db.define(
	"Functionary",
	{
		functionaryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				isId: (functionaryId) => {
					const pattern = /^(?:[1-8]|1558)\d{8}$/;
					if (!pattern.test(functionaryId)) {
						throw new Error("Format not valid");
					}
				},
				isNumeric: {
					msg: "The functionary id must be a number",
				},
				notEmpty: {
					msg: "The functionary id can't be empty",
				},
			},
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The name can't be empty",
				},
			},
		},
		middleName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The middle name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The middle name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The middle name can't be empty",
				},
			},
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The last name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The last name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The last name can't be empty",
				},
			},
		},
		lastName2: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The second last name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The second last name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The second last name can't be empty",
				},
			},
		},
		birthDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: {
					msg: "The birth date must be a valid date",
				},
				notEmpty: {
					msg: "The birth date can't be empty",
				},
			},
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING(1),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The gender can't be empty",
				},
				isIn: {
					args: [["M", "F"]],
					msg: "Gender must be M or F, M to Male and F to Female.",
				},
			},
			set(value) {
				this.setDataValue("gender", value.toUpperCase());
			},
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 255],
					msg: "The address must be between 1 and 255 characters long",
				},
				notEmpty: {
					msg: "The address can't be empty",
				},
				is: {
					args: /^[a-zA-Z0-9_, áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The address can only contain letters, numbers, spaces, and underscores",
				},
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
		defaultScope: {
			attributes: {
				exclude: ["createdAt", "updatedAt", "deletedAt"],
			},
		},
		scopes: {
			administration: {
				where: {
					deletedAt: {
						[Op.or]: [
							null,
							{
								[Op.not]: null,
							},
						],
					},
				},
			},
		},
		hooks: {
			beforeValidate: (functionary) => {
                calculateAge(functionary);
            },
			beforeUpdate: (functionary) => {
                calculateAge(functionary);
            },
			beforeBulkCreate: (functionaries) => {
				functionaries.forEach((functionary) => {
					calculateAge(functionary);
				});
			},
		},
	},
);

export default Functionary;
