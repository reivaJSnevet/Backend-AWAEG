import express from "express";
import usuarioController from "../controllers/usuarioController.js";
import verifyRole from "../middlewares/verifyRole.js";
import ROLES_LIST from "../config/roles_list.js";

const usuarioRouter = express.Router();

//Rutas para Usario
usuarioRouter.get("/usuarios", verifyRole(ROLES_LIST.Director, ROLES_LIST.Secretaria), usuarioController.getAllUsuarios);
usuarioRouter.post("/usuarios", verifyRole(ROLES_LIST.Director),usuarioController.createUsuario);
usuarioRouter.get("/usuarios/:id", verifyRole(ROLES_LIST.Director), usuarioController.getUsuarioById);
usuarioRouter.put("/usuarios/:id", verifyRole(ROLES_LIST.Director), usuarioController.updateUsuarioById);
usuarioRouter.delete("/usuarios/:id", verifyRole(ROLES_LIST.Director), usuarioController.deleteUsuarioById);

export default usuarioRouter;
