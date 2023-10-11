import { DataTypes } from "sequelize";
import db from "../config/db.js";
import CateInsumo from "./CateInsumo.js";

const InsumoInst = db.define("insumoInst", {
    nombreInsumoInst: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre del insumo no puede estar vacio"
            }
        }
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: "El campo disponible solo puede ser true o false"
            }
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: {
                msg: "La cantidad debe ser un numero"
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La descripcion no puede estar vacia"
            }
        }
    },
});

//Relacion
CateInsumo.hasMany(InsumoInst);
InsumoInst.belongsTo(CateInsumo);

export default InsumoInst;