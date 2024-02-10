import { DataTypes, Op } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import { ValidationError } from "../errors/index.js";

const User = db.define(
	"User",
	{
		userName: {
			type: DataTypes.STRING(50),
			primaryKey: true,
			allowNull: false,
			unique: true,
			validate: {
				len: {
					args: [1, 50],
					msg: "El nombre de usuario debe de contener entre 1 y 50 caracteres.",
				},
				is: {
					args: /^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "El nombre de usuario solo puede contener letras, numeros y guiones bajos."
				},
				notEmpty: {
					msg: "El nombre de usuario no puede estar vacío",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "Debe de ingresar un correo electrónico",
				},
				notEmpty: {
					msg: "El correo electrónico no puede estar vacío",
				},
				len: {
					args: [6, 255],
					msg: "El correo electrónico debe tener entre 6 y 255 caracteres",
				},
				is: {
					args: /^[a-zA-Z0-9_.@áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "El correo electrónico solo puede contener letras, números, guiones bajos, puntos y arrobas",
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [8, 255],
					msg: "La contraseña debe tener entre 8 y 255 caracteres",
				},
				notEmpty: {
					msg: "La contraseña no puede estar vacía",
				},
			},
		},
		verifyEmail: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		token: DataTypes.STRING,
		refreshToken: DataTypes.TEXT,
		recoveryToken: DataTypes.STRING,
	},
	{
		timestamps: true,
		paranoid: true, //Soft delete: deletedAt
		defaultScope: {
            attributes: {
                exclude: ["password", "createdAt", "updatedAt", "deletedAt", "token", "refreshToken", "recoveryToken"],
            },
        },
		scopes: {
			security: {
				attributes: {
					include: [
						"userName",
						"email",
						"password",
						"verifyEmail",
						"token",
						"refreshToken",
						"recoveryToken",
					],
				},
			},
			administration: {
				where: {
					deletedAt: {
						[Op.or]: [
							null,
							{
								[Op.not]: null,
							},
						],
					},
				},
			},
		},
		hooks: {
			beforeCreate: async (user) => await hashPassword(user),
            /* beforeUpdate: async (user) => await hashPassword(user), */
			beforeBulkCreate: async (users) => await hashPasswordBulk(users),
		},
	},
);

//Hooks
const hashPassword = async (user) => {
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
};

const hashPasswordBulk = async (users) => {
	for (const user of users) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	}
};

// Class methods
User.prototype.verifyPassword = function (password) {
	if (!password || !this.password) {
		throw new ValidationError("No se ha ingresado una contraseña");
	}
	return bcrypt.compareSync(password, this.password); //return true or false
};

export default User;
