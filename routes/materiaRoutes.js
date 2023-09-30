import express from "express";
import materiaController from "../controllers/materiaController.js";

const materiaRouter = express();

//Rutas de Nota
materiaRouter.get("/materias", materiaController.obtenerMaterias);
materiaRouter.post("/materias", materiaController.crearMateria);
materiaRouter.get("/materias/:id", materiaController.obtenerMateriaPorId);
materiaRouter.put("/materias/:id", materiaController.actualizarMateria);
materiaRouter.delete("/materias/:id", materiaController.eliminarMateria);

export default materiaRouter;
