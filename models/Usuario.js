import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const Usuario = db.define(
	"usuarios",
	{
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
            unique: true,
			validate: {
				notEmpty: {
					msg: "El nombre no puede estar vacío",
				},
			},
		},
		correo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "Debe ingresar un correo electrónico válido",
				},
			},
		},
		contraseña: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "La contraseña no puede estar vacía",
				},
				len: {
					args: [8, 255],
					msg: "La contraseña debe tener entre 8 y 255 caracteres",
				},
			},
		},
		correoVerificado: DataTypes.BOOLEAN,
		token: DataTypes.STRING,
        refreshToken: DataTypes.STRING,
        activo: DataTypes.BOOLEAN,
	},
	{
		hooks: {
			beforeCreate: async function (usuario) {
				const salt = await bcrypt.genSalt(10);
				usuario.contraseña = await bcrypt.hash(
					usuario.contraseña,
					salt,
				);
			},
            beforeBulkCreate: async function (usuarios) {
                for (const usuario of usuarios) {
                    const salt = await bcrypt.genSalt(10);
                    usuario.contraseña = await bcrypt.hash(
                        usuario.contraseña,
                        salt,
                    );
                }
            }
		},
		scopes: {},
	},
);

// Métodos Personalizados

// Compara la contraseña, devuelve true o false
Usuario.prototype.verificarPassword = function (contraseña) {
	if (!contraseña || !this.contraseña) {
		throw new Error("Both password and hash need to be defined");
	}

	return bcrypt.compareSync(contraseña, this.contraseña);
};

export default Usuario;
