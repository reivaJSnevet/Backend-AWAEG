import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { ValidationError } from "../errors/index.js";

const Group = db.define(
	"Group",
	{
		section: {
			type: DataTypes.STRING(10),
			allowNull: false,
			primaryKey: true,
			unique: true,
			validate: {
				isSection(value) {
					const pattern = /^[1-6]-[A-Za-z0-9]+$/;
					if (!pattern.test(value)) {
                        throw new ValidationError(
                            'La sección debe tener el formato "a-b" donde "a" es un número entre 1 y 6',
                        );
					}
				},
			},
			set(value) {
				this.setDataValue("section", value.toLowerCase());
			},
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
		classRoom: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 20],
					msg: "El nombre del salón debe tener entre 1 y 20 caracteres",
				},
				is: {
					args: /^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ ]+$/i,
					msg: "El nombre del salón solo puede contener letras, números y espacios",
				},
				notEmpty: {
					msg: "El nombre del salón no puede estar vacío",
				},
			},
		},
		studentCount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isNumeric: {
					msg: "El conteo de estudiantes debe ser un número entero",
				},
				min: {
					args: [0],
					msg: "El conteo de estudiantes no puede ser negativo, minimo 0",
				},
			},
		},
		shift: {
			type: DataTypes.ENUM("matutino", "vespertino"),
			allowNull: false,
			validate: {
				isIn: {
					args: [["matutino", "vespertino"]],
					msg: "El turno debe ser matutino o vespertino",
				},
			},
			set(value) {
				this.setDataValue("shift", value.toLowerCase());
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
			beforeValidate: (group) => {
				setCycle(group);
			},
			beforeCreate: async (group) => {
				await avoidGroupConflict(group);
			},
			beforeUpdate: async (group) => {
				setCycle(group);
			},
		},
	},
);

//Hooks

const avoidGroupConflict = async (group) => {
	const { classRoom, shift } = group;

	const groups = await Group.findOne({
		where: { classRoom, shift },
	});

	if (groups) {
		throw new ValidationError(
            "Ya existe un grupo con el mismo salón y turno",
        );
	}
};

const setCycle = (group) => {
	const { grade } = group;

	if (grade === "materno" || grade === "transición") {
		group.cycle = "prescolar";
	} else if (
		grade === "primero" ||
		grade === "segundo" ||
		grade === "tercero"
	) {
		group.cycle = "I";
	} else if (grade === "cuarto" || grade === "quinto" || grade === "sexto") {
		group.cycle = "II";
	}
};

export default Group;
