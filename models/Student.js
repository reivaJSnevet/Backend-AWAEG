import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";
import Group from "./Group.js";
import calculateAge from "../hooks/calculateAgeHook.js";

const Student = db.define(
	"Student",
	{
		studentId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
			validate: {
				isId: (functionaryId) => {
					const pattern = /^(?:[1-8]|1558)\d{8}$/;
					if (!pattern.test(functionaryId)) {
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
			/* set(value) {
				this.setDataValue("gender", value.toUpperCase());
			}, */
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
			},
		},
	},
	{
		timestamps: true,
		paranoid: true,
		defaultScope: {
			attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
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
			beforeValidate: (student) => {
				calculateAge(student);
			},
			beforeBulkCreate: (students) => {
				students.forEach((student) => {
					calculateAge(student);
				});
			},
			afterCreate: async (student) => {
				const group = await student.getGroup();

				if (group) {
					await group.update({
						studentCount: group.studentCount + 1,
					});
				}
			},
            beforeUpdate: async (student) => {
                calculateAge(student);
            },
			afterDestroy: async (student) => {
				const group = await student.getGroup();

				if (group) {
					await group.update({
						studentCount: group.studentCount - 1,
					});
				}
			},
			afterBulkCreate: async (students) => {
				const studentsBySection = {};
				students.forEach((student) => {
					const section = student.section;
					if (!studentsBySection[section]) {
						studentsBySection[section] = 1;
					} else {
						studentsBySection[section]++;
					}
				});

				const groupUpdates = [];
				for (const section in studentsBySection) {
					const studentCount = studentsBySection[section];

					groupUpdates.push(
						Group.update({ studentCount }, { where: { section } }),
					);
				}

				await Promise.all(groupUpdates);
			},
		},
	},
);

export default Student;
