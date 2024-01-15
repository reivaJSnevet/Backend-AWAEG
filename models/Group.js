import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Group = db.define(
	"Group",
	{
		section: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			validate: {
				isSection(value) {
					const pattern = /^[1-6]-[A-Za-z0-9]+$/;
					if (!pattern.test(value)) {
						throw new Error(
							'section must be a string with the format "a-b" where a is a number between 1 and 6',
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
		classRoom: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [1, 20],
					msg: "The classroom name must be between 1 and 20 characters long",
				},
				is: {
					args: /^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ ]+$/i,
					msg: "The username can only contain letters, numbers and underscores",
				},
				notEmpty: {
					msg: "The classroom name can't be empty",
				},
			},
		},
		studentCount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isNumeric: {
					msg: "The student count must be a number",
				},
				min: {
					args: [0],
					msg: "The student count can't be less than 0",
				},
			},
		},
		shift: {
			type: DataTypes.ENUM("matutino", "vespertino"),
			allowNull: false,
			validate: {
				isIn: {
					args: [["matutino", "vespertino"]],
					msg: "The shift must be matutino or vespertino",
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
		const conflict = new Error(
			"There is already a group with that classroom and shift",
		);
		conflict.name = "GroupConflict";
		throw conflict;
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
