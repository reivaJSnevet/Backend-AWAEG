import { DataTypes,Op  } from "sequelize";
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
            type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED", "RETURNED"),
            allowNull: false,
            validate: {
                isIn: {
                    args: [["PENDING", "APPROVED", "REJECTED", "RETURNED"]],
                    msg: "The state must be PENDING, APPROVED, REJECTED or RETURNED",
                },
                notEmpty: {
                    msg: "The state can't be empty",
                },
            },
            
        },

        flaw: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
    }
);

export default Loan;