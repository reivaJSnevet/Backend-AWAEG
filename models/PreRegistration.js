import { DataTypes } from "sequelize";
import db from "../config/db.js";
import {createApplication} from "../hooks/createApplicationHook.js";

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
            }
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
			set() {
				const grade = this.getDataValue("grade").toLowerCase();

                if(grade === "materno" || grade === "transición"){
                    this.setDataValue("cycle", "prescolar");
                }else if(grade === "primero" || grade === "segundo" || grade === "tercero"){
                    this.setDataValue("cycle", "I");
                }else if(grade === "cuarto" || grade === "quinto" || grade === "sexto"){
                    this.setDataValue("cycle", "II");
                }
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
        },
	},
);

export default PreRegistration;
