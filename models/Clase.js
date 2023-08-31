import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Clase = db.define(
    'clases',
    {
        dia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false
        },
        horaSalida: {
            type: DataTypes.TIME,
            allowNull: false
        },
    }

);
export default Clase;