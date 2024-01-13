import express from 'express';
import RoleController from '../controllers/roleController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateModel from '../middlewares/validateModel.js';
import {Role} from '../models/index.js';



const roleRouter = express.Router();


roleRouter.post('/roles', verifyRole(1), validateModel(Role) ,RoleController.postRole);
roleRouter.get('/roles', verifyRole(1), RoleController.getAllRoles);
roleRouter.get('/roles/:id', verifyRole(1), RoleController.getRoleById);
roleRouter.put('/roles/:id', verifyRole(1), validateModel(Role), RoleController.putRole);
roleRouter.delete('/roles/:id', verifyRole(1), RoleController.deleteRole);

export default roleRouter;