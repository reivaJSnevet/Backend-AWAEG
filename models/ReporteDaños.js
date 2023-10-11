import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Prestamo from "./Prestamo.js";

const ReporteDaños = db.define("reporteDaños", {
    categoriaDaño: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [["Daño Fisico", "Daño de Software", "Daño de Hardware", "Daño Ambiental", "Daño Intencional"]],
                msg: "La categoria de daño solo puede ser Daño Fisico, Daño de Software, Daño de Hardware, Daño Ambiental o Daño Intencional"
            }
        }
    },
    descripcionDaño: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La descripcion no puede estar vacia"
            }
        }
    }
});

//Relacion
Prestamo.hasOne(ReporteDaños,);
ReporteDaños.belongsTo(Prestamo);


export default ReporteDaños;