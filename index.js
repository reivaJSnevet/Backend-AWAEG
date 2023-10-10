import express from "express";
import cors from "cors";
import db from "./config/db.js";
import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

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
} from "./routes/index.js";

import "./tasks/actualizadorEdades.js";
import "./tasks/actualizarEdadFuncionario.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middlewares/credentials.js";

// Creacion de la app
const app = express();

//Credenciales de acceso antes de CORS para cookies
app.use(credentials)

// habilitar CORS
app.use(cors(corsOptions));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Subida de archivos
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const TipoArchivo = [
	"image/png",
	"image/jpeg",
	"image/gif",
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const multerUpload = multer({
	storage: multer.diskStorage({
		destination: join(CURRENT_DIR, "archivo"),
		filename: (req, file, cb) => {
			const fileExt = extname(file.originalname);
			const filename = file.originalname.split(fileExt)[0];

			cb(null, `${filename}-${Date.now()}${fileExt}`);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (TipoArchivo.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(
				new Error(
					"Formato de archivo no permitido, solo archivos de tipo imagen, pdf, word, power point",
				),
			);
		}
	},
	limits: {
		fieldSize: 10000000,
	},
});

// Endpoint para obtener un archivo
app.use("/api/archivo", express.static(join(CURRENT_DIR, "archivo")));

app.get("/api/archivo/:nombreArchivo", (req, res) => {
	const { nombreArchivo } = req.params;
	const rutaArchivo = join(CURRENT_DIR, "archivo", nombreArchivo);

	// Verifica si el archivo existe antes de enviarlo como descarga
	fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
		if (err) {
			return res.status(404).json({ message: "El archivo no existe" });
		}

		// Envía el archivo como respuesta
		res.download(rutaArchivo, (err) => {
			if (err) {
				// Maneja errores durante la descarga
				res.status(500).json({
					message: "Error al descargar el archivo",
				});
			}
		});
	});
});

// Endpoint para obtener todos los archivos
app.get("/api/archivos", (req, res) => {
	const directorioArchivos = join(CURRENT_DIR, "archivo");
	fs.readdir(directorioArchivos, (err, files) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Error al obtener la lista de archivos" });
		}

		// Filtrar archivos para excluir .gitkeep
		const archivosFiltrados = files.filter(
			(archivo) => archivo !== ".gitkeep",
		);

		res.status(200).json({ archivos: archivosFiltrados });
	});
});

//endpoint para subir un archivo
app.post("/api/upload", (req, res, next) => {
	multerUpload.single("file")(req, res, (err) => {
		if (err) {
			// Error en la subida de archivos
			return res.status(400).json({ message: err.message });
		}
		console.log(req.file);
		res.status(200).json({ message: "Archivo subido correctamente" });
	});
});

// Endpoint para eliminar un archivo
app.delete("/api/archivo/:nombreArchivo", (req, res) => {
	const { nombreArchivo } = req.params;
	const rutaArchivo = join(CURRENT_DIR, "archivo", nombreArchivo);

	// Verifica si el archivo existe antes de eliminarlo
	fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
		if (err) {
			return res.status(404).json({ message: "El archivo no existe" });
		}

		// Elimina el archivo
		fs.unlink(rutaArchivo, (err) => {
			if (err) {
				return res
					.status(500)
					.json({ message: "Error al eliminar el archivo" });
			}
			res.status(200).json({
				message: "Archivo eliminado correctamente",
			});
		});
	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
app.use("/api/", authRoutes);
app.use("/api/", materiaRoutes);
app.use("/api/", solicitudRoutes);
app.use("/api/", refreshRoutes);
app.use("/api/", logoutRoutes);

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
