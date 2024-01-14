import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); */

// Load environment variables
dotenv.config({ path: ".env" });

//Db configuration
const db = new Sequelize(
	process.env.BD_NOMBRE,
	process.env.BD_USER,
	process.env.BD_PASS ?? " ",
	{
		host: process.env.BD_HOST,
		port: process.env.BD_PORT,
		dialect: "mysql",
        timezone: "-06:00",
        logging: (msg) => console.log(msg),
		define: {
			timestamps: false,
		},
		pool: {
			max: 5, // max allowed connections
			min: 0, // min allowed connections
			acquire: 300000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
			idle: 300000, // maximum time, in milliseconds, that a connection can be idle before being released
		},
/*         dialectOptions: { // For SSL connection
            ssl:{
                rejectUnauthorized: false,
                //ca: fs.readFileSync(__dirname + '\\DigiCertGlobalRootCA.crt.pem')
                ca: fs.readFileSync(path.join(path.resolve(), 'DigiCertGlobalRootCA.crt.pem'))
            }
        }, */
	},
);

export default db;
