import express from "express";
import grupoController from "../controllers/grupoController.js";

const grupoRouter = express.Router();

//Rutas para grupo
grupoRouter.get("/grupos", grupoController.obtenerGrupos);
grupoRouter.post("/grupos", grupoController.crearGrupo);
grupoRouter.get("/grupos/:seccion", grupoController.obtenerGrupo);
grupoRouter.put("/grupos/:seccion", grupoController.actualizarGrupo);
grupoRouter.delete("/grupos/:seccion", grupoController.eliminarGrupo);

export default grupoRouter;
