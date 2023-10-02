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
				notEmpty: {
					msg: "El nombre no puede estar vacío",
				},
			},
		},
		apellido1: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El primer apellido no puede estar vacío",
				},
			},
		},
		apellido2: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "El segundo apellido no puede estar vacío",
				},
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
		},
	},
	{
		hooks: {
			beforeCreate: (funcionario) => CalcularEdad(funcionario),
			beforeUpdate: (funcionario) => CalcularEdad(funcionario),
            beforeBulkCreate: (funcionarios) => { funcionarios.forEach(funcionario => CalcularEdad(funcionario))}
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

	funcionario.edad = edadExacta;
};

export default Funcionario;
