import express from "express";
import usuarioController from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

//Rutas para Usario
usuarioRouter.get("/usuarios", usuarioController.getAllUsuarios);
usuarioRouter.post("/usuarios", usuarioController.createUsuario);
usuarioRouter.get("/usuarios/:id", usuarioController.getUsuarioById);
usuarioRouter.put("/usuarios/:id", usuarioController.updateUsuarioById);
usuarioRouter.delete("/usuarios/:id", usuarioController.deleteUsuarioById);

export default usuarioRouter;
