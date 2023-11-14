import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Funcionario from "./Funcionario.js";
import InsumoEst from "./InsumoEst.js";
import InsumoInst from "./InsumoInst.js";
import { crear } from "../hooks/crearSolicitud.js";

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




},{
    hooks:{
        beforeCreate:  async (prestamo) => {
            await crear(prestamo)
        }
    }
}
);
//Relacion
Funcionario.hasMany(Prestamo);
Prestamo.belongsTo(Funcionario);

InsumoEst.hasMany(Prestamo, {foreignKey: 'solicitante'});
Prestamo.belongsTo(InsumoEst, {foreignKey: 'solicitante'});

InsumoInst.hasMany(Prestamo, {foreignKey: 'solicitante'});
Prestamo.belongsTo(InsumoInst, {foreignKey: 'solicitante'});

export default Prestamo;