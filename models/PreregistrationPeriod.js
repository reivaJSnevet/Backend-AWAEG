import { DataTypes } from "sequelize";
import db from "../config/db.js";

const PreregistrationPeriod = db.define(
    "PreregistrationPeriod",
    {
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
);

export default PreregistrationPeriod;