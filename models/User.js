import { DataTypes, Op } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

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
					msg: "The username must be between 1 and 50 characters long",
				},
				is: {
					args: /^[a-zA-Z0-9_áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The username can only contain letters, numbers and underscores",
				},
				notEmpty: {
					msg: "The username can't be empty",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: "You must enter a valid email",
				},
				notEmpty: {
					msg: "Email can't be empty",
				},
				len: {
					args: [6, 255],
					msg: "The email must be between 6 and 255 characters long",
				},
				is: {
					args: /^[a-zA-Z0-9_.@áéíóúÁÉÍÓÚüÜñÑ]+$/i,
					msg: "The email can only contain letters, numbers, underscores, periods, and arrobas",
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [8, 255],
					msg: "The password must be between 8 and 255 characters long",
				},
				notEmpty: {
					msg: "Password can't be empty",
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
                exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
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
		throw new Error("Both password and hash need to be defined");
	}
	return bcrypt.compareSync(password, this.password); //return true or false
};

export default User;
