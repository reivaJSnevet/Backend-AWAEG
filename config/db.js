import { Sequelize } from "sequelize";
import dotenv from "dotenv";

//definir ruta del archivo .env
dotenv.config({ path: ".env" });

//Configuracion de la DB y conexion
const db = new Sequelize(
	process.env.BD_NOMBRE,
	process.env.BD_USER,
	process.env.BD_PASS ?? " ",
	{
		host: process.env.BD_HOST,
		port: 3306,
		dialect: "mysql",
        logging: false,
		define: {
			timestamps: true,
		},
		pool: {
			max: 5, //conexiones activas a mantener
			min: 0, // las minimas
			acquire: 3000, //tiempo antes de maracar error de conexion 3000= 30s
			idle: 10000, //tiempo antes de cerrar las conexiones si no hay movimiento 1000= 10s
		},
	},
);

export default db;
