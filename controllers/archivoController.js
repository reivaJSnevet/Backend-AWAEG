import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import { extname } from "path";
import archivoService from "../services/archivoServices.js";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const ARCHIVO_DIR = join(CURRENT_DIR, "../archivo");

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
    destination: function (req, file, cb) {
      cb(null, ARCHIVO_DIR);
    },
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
      cb(new Error("Formato de archivo no permitido, solo archivos de tipo imagen, pdf, word, power point"));
    }
  },
  limits: {
    fieldSize: 10000000,
  },
});

export const subirArchivo = (req, res) => {

  multerUpload.single("archivo")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    console.log(req.file, req.body);

    const { mimetype, filename } = req.file;

    archivoService.subirArchivo({nombre: filename, tipo: mimetype , estado: true, funcionarioId: req.body.funcionarioId});  

    res.status(200).json({ message: "Archivo subido correctamente" });
  });
};

export const obtenerArchivo = (req, res) => {
    const { nombreArchivo } = req.params;
    const rutaArchivo = join(ARCHIVO_DIR, nombreArchivo);
  
    // Verifica si el archivo existe antes de enviarlo como descarga
    fs.stat(rutaArchivo, (err, stats) => {
      if (err) {
        return res.status(404).json({ message: "El archivo no existe", error: err });
      }
  
      // Verifica si rutaArchivo es un archivo
      if (!stats.isFile()) {
        return res.status(404).json({ message: "La ruta no apunta a un archivo" });
      }
  
      // Envía el archivo como respuesta
      res.download(rutaArchivo, (err) => {
        if (err) {
          res.status(500).json({ message: "Error al descargar el archivo", error: err });
        }
      });
    });
};

export const obtenerArchivos = (req, res) => {
    const directorioArchivos = join(ARCHIVO_DIR);
    fs.readdir(directorioArchivos, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error al obtener la lista de archivos" });
        }
      
        // Filtrar archivos para excluir .gitkeep
        const archivosFiltrados = files.filter((archivo) => archivo !== '.gitkeep');
      
        res.status(200).json({ archivos: archivosFiltrados });
    });
};

export const eliminarArchivo = (req, res) => {
    const { nombreArchivo } = req.params;
	const rutaArchivo = join(ARCHIVO_DIR, nombreArchivo);
  
	// Verifica si el archivo existe antes de eliminarlo
	fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
	  if (err) {
		return res.status(404).json({ message: "El archivo no existe" });
	  }
  
	  // Elimina el archivo
	  fs.unlink(rutaArchivo, (err) => {
		if (err) {
		  return res.status(500).json({ message: "Error al eliminar el archivo" });
		}
		res.status(200).json({ message: "Archivo eliminado correctamente" });
	  });
	});
};