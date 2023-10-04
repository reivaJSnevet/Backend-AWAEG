import express from "express";
import usuarioController from "../controllers/usuarioController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const usuarioRouter = express.Router();

//Rutas para Usario
usuarioRouter.get("/usuarios", checkRole(['Director', 'Secretaria']), usuarioController.getAllUsuarios);
usuarioRouter.post("/usuarios", checkRole('Director'),usuarioController.createUsuario);
usuarioRouter.get("/usuarios/:id", checkRole(['Director', 'Secretaria']), usuarioController.getUsuarioById);
usuarioRouter.put("/usuarios/:id", checkRole('Director'), usuarioController.updateUsuarioById);
usuarioRouter.delete("/usuarios/:id", checkRole('Director'), usuarioController.deleteUsuarioById);

export default usuarioRouter;
