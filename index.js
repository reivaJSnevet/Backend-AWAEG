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
  solicitudes
  citaRoutes
  prestamoRoutes,
  reporteDañosRoutes,
  cateInsumoRoutes,
  insumoEstRoutes,
  insumoInstRoutes,

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
app.use(credentials)

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
	try {
		await db.authenticate();
		console.log("Conexion Correcta a la Base de datos");

		try {
			await db.sync({ force: false });
			console.log("Sincronización en la Base de datos exitosa");
		} catch (error) {
			console.log(
				"Error en la sincronización de la Base de datos:",
				error,
			);
		}
	} catch (error) {
		console.log("Error en la conexión a la Base de datos:", error);
	}
}

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


app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `No se encontro la ruta ${req.originalUrl}`,
    });
});

// definir puerto y inicializacion del server
const port = process.env.PORT || 3000;

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send(err.message)   
})

app.listen(port, () => {
	console.log(`El server esta corriendo en el Puerto:${port}`);
});
