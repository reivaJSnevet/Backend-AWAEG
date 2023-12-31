import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); */

//definir ruta del archivo .env
dotenv.config({ path: ".env" });

// String de conexión a la base de datos
//const connectionString = "host=MYSQL5045.site4now.net;database=db_aa134c_awaegdb;user=aa134c_awaegdb;password=wwsw22u0";

//Configuracion de la DB y conexion
const db = new Sequelize(
	process.env.BD_NOMBRE,
	process.env.BD_USER,
	process.env.BD_PASS ?? " ",
	{
		host: process.env.BD_HOST,
		port: process.env.BD_PORT,
		dialect: "mysql",
        timezone: "-06:00",
        logging: false,
		define: {
			timestamps: true,
		},
		pool: {
			max: 5, //conexiones activas a mantener
			min: 0, // las minimas
			acquire: 300000, //tiempo antes de maracar error de conexion 3000= 30s
			idle: 300000, //tiempo antes de cerrar las conexiones si no hay movimiento 1000= 10s
		},
        dialectOptions: {
            ssl:{
                rejectUnauthorized: false,
                //ca: fs.readFileSync(__dirname + '\\DigiCertGlobalRootCA.crt.pem')
                ca: fs.readFileSync(path.join(path.resolve(), 'DigiCertGlobalRootCA.crt.pem'))
            }
        },
	},
);

export default db;
