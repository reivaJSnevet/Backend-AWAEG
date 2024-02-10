import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { ValidationError } from "../errors/index.js";
import Group from "./Group.js";

const Class = db.define(
	"Class",
	{
		classId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		shift: {
			type: DataTypes.ENUM("matutino", "vespertino"),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El turno no puede estar vacío",
				},
				isIn: {
					args: [["matutino", "vespertino"]],
					msg: "El turno debe ser matutino o vespertino",
				},
				set(value) {
					this.setDataValue("shift", value.toLowerCase());
				},
			},
		},
	},
	{
		timestamps: true,
		defaultScope: {
			attributes: { exclude: ["createdAt", "updatedAt"] },
		},
		hooks: {
			beforeCreate: async (classInstance) => {
				await matchShift(classInstance);
			},
			beforeUpdate: async (classInstance) => {
				await matchShift(classInstance);
			},
		},
	},
);

export default Class;

//Hooks

const matchShift = async (classInstance) => {
	try {
		const group = await Group.findByPk(classInstance.section);

		if (group.shift !== classInstance.shift) {
            throw new ValidationError(
                "El turno de la clase no coincide con el turno del gruoo",
            );
		}
	} catch (error) {
		throw error;
	}
};
