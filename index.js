import express from "express";
import cors from "cors";
import db from "./config/db.js";

import {
	claseRoutes,
	estudianteRoutes,
	grupoRoutes,
	horarioRoutes,
	rolRoutes,
	usuarioRoutes,
	prematriculaRoutes,
	funcionarioRoutes,
	encargadoRoutes,
	notasRoutes,
	materiaRoutes,
	solicitudRoutes,
	authRoutes,
	refreshRoutes,
	logoutRoutes,
	citaRoutes,
	prestamoRoutes,
	reporteDañosRoutes,
	cateInsumoRoutes,
	insumoEstRoutes,
	insumoInstRoutes,
	archivoRoutes,
} from "./routes/index.js";

import "./tasks/actualizadorEdades.js";
import "./tasks/actualizarEdadFuncionario.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middlewares/credentials.js";
import verificarJWT from "./middlewares/verificarJWT.js";

// Creacion de la app
const app = express();

//Credenciales de acceso antes de CORS para cookies
app.use(credentials);

// habilitar CORS
app.use(cors(corsOptions));

// habilitar lectura de datos complejos en la solicitud URL, como matrices y Obj.anidados
app.use(express.urlencoded({ extended: true }));

// habilita lectura de json en URL
app.use(express.json());

// coockies
app.use(cookieParser());

// Conexion a la Base de datos
async function conectarDB() {
    let intentos = 3; // Número máximo de reintentos
    while (intentos > 0) {
      try {
        await db.authenticate();
        console.log("Autenticación en la Base de datos exitosa");
  
        try {
          await db.sync({ force: false });
          console.log("Sincronización en la Base de datos exitosa");
          break; // Salir del bucle si la conexión y sincronización son exitosas
        } catch (errorSync) {
          console.log(
            "Error en la sincronización de la Base de datos:",
            errorSync
          );
        }
      } catch (errorAuth) {
        console.log("Error en la conexión a la Base de datos:", errorAuth);
        console.log(`Intentos restantes: ${intentos}`);
        intentos--;
        await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos antes de intentar nuevamente
      }
    }
  
    if (intentos === 0) {
      console.log("No se pudo establecer la conexión después de varios intentos.");
    }
  }
  
  // Llamar a la función
  conectarDB();

// Rutas
app.use("/api/", authRoutes);
app.use("/api/", refreshRoutes);
app.use("/api/", logoutRoutes);

app.use(verificarJWT);
app.use("/api/", estudianteRoutes);
app.use("/api/", grupoRoutes);
app.use("/api/", horarioRoutes);
app.use("/api/", rolRoutes);
app.use("/api/", usuarioRoutes);
app.use("/api/", prematriculaRoutes);
app.use("/api/", funcionarioRoutes);
app.use("/api/", encargadoRoutes);
app.use("/api/", notasRoutes);
app.use("/api/", claseRoutes);
app.use("/api/", materiaRoutes);
app.use("/api/", solicitudRoutes);
app.use("/api/", citaRoutes);
app.use("/api/", prestamoRoutes);
app.use("/api/", reporteDañosRoutes);
app.use("/api/", cateInsumoRoutes);
app.use("/api/", insumoEstRoutes);
app.use("/api/", insumoInstRoutes);
app.use("/api/", archivoRoutes);

app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: `No se encontro la ruta ${req.originalUrl}`,
	});
});

// definir puerto y inicializacion del server
const port = process.env.PORT || 3000;

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(err.message);
});

app.listen(port, () => {
	console.log(`Inicio del Servidor. El server esta corriendo en el Puerto:${port}`);
});





import os from 'os';
import { lookup } from 'dns';

// Función para obtener la dirección IP de la interfaz de red
function getIPAddress() {
  return new Promise((resolve, reject) => {
    lookup(os.hostname(), (err, address) => {
      if (err) {
        reject(err);
      } else {
        resolve(address);
      }
    });
  });
}

// Función principal con async/await
async function main() {
  try {
    const ip = await getIPAddress();
    console.log(`Mi dirección IP es: ${ip}`);
  } catch (error) {
    console.error('Error al obtener la dirección IP:', error);
  }
}

// Llama a la función principal
main();