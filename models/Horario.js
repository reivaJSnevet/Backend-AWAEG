import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Horario = db.define(
    'horarios',
    {
        cicloLectivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provicional: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        turno: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }

);
export default Horario;