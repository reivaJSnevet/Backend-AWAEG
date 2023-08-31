import express from "express";
import rolController from "../controllers/rolController.js";


const rolRouter = express.Router();

//Rutas para Rol
rolRouter.post('/roles', rolController.crearRol);
rolRouter.get('/roles', rolController.getAllRoles);
rolRouter.get('/roles/:id', rolController.getRolById);
rolRouter.put('/roles/:id', rolController.updateRolById);
rolRouter.delete('/roles/:id', rolController.deleteRolById);



export default rolRouter;