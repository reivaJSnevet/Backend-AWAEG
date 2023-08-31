import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Encargado = db.define(
    'encargados',
    {   
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                msg: 'El nombre no puede estar vacío'
              }
            }
          },
        apellido1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: {
                msg: 'El primer apellido no puede estar vacío'
              }
            }
          },
        apellido2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: {
                msg: 'El segundo apellido no puede estar vacío'
              }
            }
        },
    }
);

export default Encargado;