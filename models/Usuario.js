import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import db from "../config/db.js";


const Usuario = db.define(
    'usuarios',
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correoVerificado: DataTypes.BOOLEAN,
        token: DataTypes.STRING
    },{
        hooks: {
            beforeCreate: async function(usuario){
                const salt = await bcrypt.genSalt(10)
                usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt)
            }
        },
        scopes:{

        }
    }
)


//Metodos Personalizados
Usuario.prototype.verificarPassword = function(contraseña){
    return bcrypt.compareSync(contraseña, this.contraseña);
}

export default Usuario;
