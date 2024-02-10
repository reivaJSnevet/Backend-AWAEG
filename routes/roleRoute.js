import { Router } from 'express';
import RoleController from '../controllers/roleController.js';

const roleRouter = Router();

roleRouter.post('/roles', RoleController.postRole);
roleRouter.get('/roles', RoleController.getAllRoles);
roleRouter.get('/roles/:id', RoleController.getRoleById);
roleRouter.put('/roles/:id', RoleController.putRole);
roleRouter.delete('/roles/:id', RoleController.deleteRole);

export default roleRouter;