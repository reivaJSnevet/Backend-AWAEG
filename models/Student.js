import { DataTypes, Op, json } from "sequelize";
import db from "../config/db.js";
import Group from "./Group.js";

const Student = db.define(
	"Student",
	{
		studentId: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		allergies: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		healthObservations: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		accommodation: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isIn: {
					args: [["regular", "especial"]],
					msg: 'La educación debe ser "regular" o "especial"',		//por confrimar
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
			afterCreate: (student) => {
				addGroupCount(student.section);
			},
            afterUpdate: (student) => {

                if (student.section !== student._previousDataValues.section) {
                    subtractGroupCount(student._previousDataValues.section);
                    addGroupCount(student.section);
                }


            },
			afterDestroy: (student) => {
				subtractGroupCount(student.section);
			},
			afterBulkCreate: (student) => {
				addGroupCountBulk(student);
			},
		},
	},
);

//Hooks
const addGroupCount = async (section) => {

	if (section) {
		const group = await Group.findByPk(section);
        if (group) {
            group.increment("studentCount");
        }
	}

};

const subtractGroupCount = async (section) => {

	if (section) {
		const group = await Group.findByPk(section);
        if (group) {
            group.decrement("studentCount");
        }
	}
};

const addGroupCountBulk = async (students) => {
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
};

export default Student;
