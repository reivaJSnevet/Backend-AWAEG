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
                    msg: "La fecha del préstamo debe ser una fecha válida",
                },
                notEmpty: {
                    msg: "La fecha del préstamo no puede estar vacía",
                },
            },
        },

        deadLine: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: {
                    msg: "La fecha de devolución debe ser una fecha válida",
                },
                notEmpty: {
                    msg: "La fecha de devolución no puede estar vacía",
                },
            },
        },

        state: {
            type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED", "RETURNED"),
            allowNull: false,
            validate: {
                isIn: {
                    args: [["PENDING", "APPROVED", "REJECTED", "RETURNED"]],
                    msg: "El estado del préstamo debe ser PENDING, APPROVED, REJECTED o RETURNED",
                },
                notEmpty: {
                    msg: "El estado del préstamo no puede estar vacío",
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