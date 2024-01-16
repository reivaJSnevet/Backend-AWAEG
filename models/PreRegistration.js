import { DataTypes } from "sequelize";
import db from "../config/db.js";
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
					msg: "The grade must be materno, transición, primero, segundo, tercero, cuarto, quinto or sexto",
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
					msg: "The cycle must be prescolar, I or II",
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
					msg: "The status must be pending, approved or rejected",
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
		defaultScope: {
			attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
		},
		hooks: {
			beforeCreate: createApplication,
			beforeValidate: (preRegistration) => {
				setCycle(preRegistration);
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

	if (grade in gradeToCycleMap) {
		group.cycle = gradeToCycleMap[grade];
	} else {
		throw new Error(`Grado no reconocido: ${grade}`);
	}
};

export default PreRegistration;
