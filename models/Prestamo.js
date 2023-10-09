import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Funcionario from "./Funcionario.js";

const Prestamo = db.define("prestamos", {
    fechPrestamo:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate:{
                msg: "La fecha no es valida"
            }
        }
    },
    fechDevolucion:{
        type: DataTypes.DATE,
        defaultValue: null,
        validate: {
            isDate:{
                msg: "La fecha no es valida"
            }
        }
    },
    estado:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn:{
                args:[[true, false]],
                msg: "El campo estado solo puede ser Libre o Ocupado"
            }
        }
    },
    averias: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn:{
                args:[[true, false]],
                msg: "El campo averias solo puede ser true o false"
            }
        }
    },




})
//Relacion
Funcionario.hasMany(Prestamo);
Prestamo.belongsTo(Funcionario);

export default Prestamo;