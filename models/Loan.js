import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";

const Loan = db.define(
	"Loan",
	{
		loanId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		loanDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: {
					msg: "The loan date must be a valid date",
				},
				notEmpty: {
					msg: "The loan date can't be empty",
				},
			},
		},
		deadLine: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: {
					msg: "The deadline must be a valid date",
				},
				notEmpty: {
					msg: "The dead line can't be empty",
				},
			},
		},
		state: {
			type: DataTypes.ENUM("pending", "approved", "rejected", "returned"),
			allowNull: false,
			validate: {
				isIn: {
					args: [["pending", "approved", "rejected", "returned"]],
					msg: "The state must be pending, approved, rejected or returned",
				},
				notEmpty: {
					msg: "The state can't be empty",
				},
			},
		},
        observations: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "The observation can't be empty",
                },
                is: {
                    args: /^[a-zA-Z0-9_ áéíóúÁÉÍÓÚüÜñÑ]+$/i,
                    msg: "The observation can only contain letters, numbers and underscores",
                },
            },
        },
	},
	{
		timestamps: true,
		paranoid: true,
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
	},
);

export default Loan;
