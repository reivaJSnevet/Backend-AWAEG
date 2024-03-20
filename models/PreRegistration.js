import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { ValidationError } from "../errors/index.js";
import { createApplication } from "../hooks/createApplicationHook.js";


const PreRegistration = db.define(
	"PreRegistration",
	{
		preRegistrationId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		grade: {
			type: DataTypes.ENUM(
				"materno",
				"transición",
				"primero",
				"segundo",
				"tercero",
				"cuarto",
				"quinto",
				"sexto",
			),
			allowNull: false,
			validate: {
				isIn: {
					args: [
						[
							"materno",
							"transición",
							"primero",
							"segundo",
							"tercero",
							"cuarto",
							"quinto",
							"sexto",
						],
					],
					msg: "El grado debe ser materno, transición, primero, segundo, tercero, cuarto, quinto o sexto",
				},
			},
			set(value) {
				this.setDataValue("grade", value.toLowerCase());
			},
		},
		cycle: {
			type: DataTypes.ENUM("prescolar", "I", "II"),
			allowNull: false,
			validate: {
				isIn: {
					args: [["prescolar", "I", "II"]],
					msg: "El ciclo debe ser prescolar, I o II",
				},
			},
		},
		status: {
			type: DataTypes.ENUM("pending", "approved", "rejected"),
			allowNull: false,
			defaultValue: "pending",
			validate: {
				isIn: {
					args: [["pending", "approved", "rejected"]],
					msg: "El estado debe ser pendiente, aprobado o rechazado",
				},
			},
			set(value) {
				this.setDataValue("status", value.toLowerCase());
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
		hooks: {
			beforeCreate: createApplication,
			beforeValidate: (preRegistration) => {
                if (preRegistration.changed("grade")){
				setCycle(preRegistration);
            }
			},
		},
	},
);

const setCycle = (preRegistration) => {
	const { grade } = preRegistration;

	const gradeToCycleMap = {
		materno: "prescolar",
		transición: "prescolar",
		primero: "I",
		segundo: "I",
		tercero: "I",
		cuarto: "II",
		quinto: "II",
		sexto: "II",
	};

	if (gradeToCycleMap[grade]) {
		preRegistration.cycle = gradeToCycleMap[grade];
	} else {
        throw new ValidationError("El grado no es válido");
    }
};

export default PreRegistration;
