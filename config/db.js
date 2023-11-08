import { Sequelize } from "sequelize";

// String de conexión a la base de datos
//const connectionString = "host=MYSQL5045.site4now.net;database=db_aa134c_awaegdb;user=aa134c_awaegdb;password=wwsw22u0";

// Configuración de la DB y conexión
const db = new Sequelize({
    dialect: 'mysql',
    host: 'MYSQL5045.site4now.net',
    database: 'db_aa134c_awaegdb',
    username: 'aa134c_awaegdb',
    password: 'wwsw22u0',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

export default db;
