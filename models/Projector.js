import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Projector = db.define("Projector", {
    projectorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    resolution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20],
            notEmpty: true,
            notNull: true,
        },
    },
    videoPorts: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20],
            notEmpty: true,
            notNull: true,
        },
    },
    brightness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
    speakers: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    },
});

export default Projector;