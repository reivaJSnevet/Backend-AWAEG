import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Funcionario = db.define(
	"funcionarios",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			validate: {
				esCedulaValida: (cedula) => {
					const patron = /^(?:[1-8]|1558)\d{8}$/;
					if (!patron.test(cedula)) {
						throw new Error(
							"El número de cedula no cumple con el formato requerido",
						);
					}
				},
			},
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: {
					msg: "El nombre solo puede contener letras. Es obligatorio.",
				},
			},
		},
		apellido1: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: {
					msg: "El primer apellido solo puede contener letras. Es obligatorio.",
				}
			},
		},
		apellido2: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: {
					msg: "El segundo apellido solo puede contener letras. Es obligatorio.",
				}
			},
		},
		fechaNacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: {
					msg: "La fecha no es valida",
				},
			},
		},
		edad: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		sexo: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			validate: {
				isIn: {
					args: [[true, false]],
					msg: "El campo sexo solo puede ser true o false",
				},
			},
		},
	},
	{
		hooks: {
			beforeCreate: (funcionario) => CalcularEdad(funcionario),
			beforeUpdate: (funcionario) => CalcularEdad(funcionario),
		},
	},
);
const CalcularEdad = (funcionario) => {
	const nacimiento = new Date(funcionario.fechaNacimiento);
	const hoy = new Date();

	let edadExacta = hoy.getFullYear() - nacimiento.getFullYear();

	// Ajustamos la edad si el cumpleaños aún no ha ocurrido este año
	if (
		nacimiento.getMonth() > hoy.getMonth() ||
		(nacimiento.getMonth() === hoy.getMonth() &&
			nacimiento.getDate() >= hoy.getDate())
	) {
		edadExacta--;
	}

	funcionario.setDataValue("edad", edadExacta);
};

export default Funcionario;
