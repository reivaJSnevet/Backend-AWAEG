import express from "express";
import rolController from "../controllers/rolController.js";


const rolRouter = express.Router();

//Rutas para Rol
rolRouter.get('/roles', rolController.getAllRoles);
rolRouter.post('/roles', rolController.createRol);
rolRouter.get('/roles/:id', rolController.getRolById);
rolRouter.put('/roles/:id', rolController.updateRolById);
rolRouter.delete('/roles/:id', rolController.deleteRolById);



export default rolRouter;