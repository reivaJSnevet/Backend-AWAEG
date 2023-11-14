import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// String de conexión a la base de datos
//const connectionString = "host=MYSQL5045.site4now.net;database=db_aa134c_awaegdb;user=aa134c_awaegdb;password=wwsw22u0";

//Configuracion de la DB y conexion
const db = new Sequelize(
	process.env.BD_NOMBRE,
	process.env.BD_USER,
	process.env.BD_PASS ?? " ",
	{
		host: process.env.BD_HOST,
		port: 3306,
		dialect: "mysql",
        timezone: "-06:00",
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
        dialectOptions: {
            ssl:{
                ca: fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem')
            }
        },
	},
);

export default db;
