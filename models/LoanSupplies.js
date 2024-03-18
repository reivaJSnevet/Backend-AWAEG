import { DataTypes } from "sequelize";
import db from "../config/db.js";

const LoanSupplies = db.define("LoanSupplies", {
    loanSuppliesId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    loanId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    supplieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
});

export default LoanSupplies;