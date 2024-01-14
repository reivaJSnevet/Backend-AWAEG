import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

//Db configuration
/**
 * Represents the database connection.
 * @type {Sequelize}
 */
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
			acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
			idle: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
		},
	},
);

export default db;
