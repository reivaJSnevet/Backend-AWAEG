import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Caregiver = db.define(
	"Caregiver",
	{
		caregiverId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING(8),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El número de teléfono no puede estar vacío",
				},
				len: {
					args: [8, 8],
					msg: "El número de teléfono debe tener 8 dígitos",
				},
				is: {
					args: /^[0-9]+$/i,
					msg: "El número de teléfono debe contener solo números",
				},
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
				"Encargado legal"
			),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La relación con el paciente no puede estar vacía",
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
                            "Encargado legal"
						],
					],
					msg: "La relacion con el estudiante debe ser válida (Abuelo, Abuela, Tio, Tia, Padre, Madre, Hermano, Hermana, Padrastro, Madrasta, Encargado legal)",
				},
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
	},

);

export default Caregiver;
