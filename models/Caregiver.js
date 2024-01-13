import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Caregiver = db.define(
	"Caregiver",
	{
		caregiverId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
			validate: {
				isId: (caregiverId) => {
					const pattern = /^(?:[1-8]|1558)\d{8}$/;
					if (!pattern.test(caregiverId)) {
						throw new Error("Format not valid");
					}
				},
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z ]+$/i,
					msg: "The name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The name can't be empty",
				},
			},
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The middle name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z ]+$/i,
					msg: "The middle name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The middle name can't be empty",
				},
			},
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The last name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z ]+$/i,
					msg: "The last name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The last name can't be empty",
				},
			},
		},
		lastName2: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 50],
					msg: "The last name must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z ]+$/i,
					msg: "The last name can only contain letters and spaces",
				},
				notEmpty: {
					msg: "The last name can't be empty",
				},
			},
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: {
					args: /^[0-9]+$/i,
					msg: "The phone number can only contain numbers",
				},
				notEmpty: {
					msg: "The phone number can't be empty",
				},
				len: {
					args: [8, 8],
					msg: "The phone number must be 10 digits long",
				},
			},
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The gender can't be empty",
				},
				isIn: {
					args: [["M", "F"]],
					msg: "Gender must be M or F, M for Male and F for Female.",
				},
			},
			set(value) {
				this.setDataValue("gender", value.toUpperCase());
			},
		},
		relationTo: {
			type: DataTypes.ENUM(
				"Abuelo",
				"Abuela",
				"Tio",
				"Tia",
				"Padre",
				"Madre",
				"Hermano",
				"Hermana",
				"Padrastro",
				"Madrasta",
			),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "The relation to can't be empty",
				},
				isIn: {
					args: [
						[
							"Abuelo",
							"Abuela",
							"Tio",
							"Tia",
							"Padre",
							"Madre",
							"Hermano",
							"Hermana",
							"Padrastro",
							"Madrasta",
						],
					],
					msg: "The relation to must be Abuelo, Abuela, Tio, Tia, Padre, Madre, Hermano, Hermana, Padrastro or Madrasta",
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

export default Caregiver;
