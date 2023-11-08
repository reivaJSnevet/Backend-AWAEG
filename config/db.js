import { Sequelize } from "sequelize";

// String de conexión a la base de datos
const connectionString = "Server=MYSQL5045.site4now.net;Database=db_aa134c_awaegdb;Uid=aa134c_awaegdb;Pwd=wwsw22u0";

// Configuración de la DB y conexión
const db = new Sequelize(connectionString, {
  dialect: "mysql",
  timezone: "-06:00",
  logging: false,
  define: {
    timestamps: true,
  },
  pool: {
    max: 5, // Conexiones activas a mantener
    min: 0, // Mínimas conexiones
    acquire: 3000, // Tiempo antes de marcar error de conexión (3000 = 30s)
    idle: 10000, // Tiempo antes de cerrar las conexiones si no hay movimiento (10000 = 10s)
  },
});

export default db;
