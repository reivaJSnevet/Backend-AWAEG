import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Clase = db.define(
    'clases',
    {
        dia: {
            type: DataTypes.DATE,
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
        leccion: {
            type: DataTypes.CHAR,
        },
    }

);
export default Clase;