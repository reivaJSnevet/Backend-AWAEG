import express from 'express';
import RoleController from '../controllers/roleController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from "../middlewares/validationMiddleware.js";
import { roleSchemaCreate, roleSchemaUpdate } from '../models/Schemas/roleSchema.js';



const roleRouter = express.Router();


roleRouter.post('/roles', verifyRole(1), validateSchema(roleSchemaCreate) ,RoleController.postRole);
roleRouter.get('/roles', verifyRole(1), RoleController.getAllRoles);
roleRouter.get('/roles/:id', verifyRole(1), RoleController.getRoleById);
roleRouter.put('/roles/:id', verifyRole(1), validateSchema(roleSchemaUpdate), RoleController.putRole);
roleRouter.delete('/roles/:id', verifyRole(1), RoleController.deleteRole);

export default roleRouter;