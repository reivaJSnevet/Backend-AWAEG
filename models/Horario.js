import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Horario = db.define(
    'horarios',
    {
        provicional: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }

);
export default Horario;