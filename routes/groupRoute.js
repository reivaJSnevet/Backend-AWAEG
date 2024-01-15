import express from 'express';
import GroupController from '../controllers/groupController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { groupSchemaCreate, groupSchemaUpdate } from '../models/Schemas/groupSchema.js';

const groupRouter = express.Router();

groupRouter.post('/groups', verifyRole(2), validateSchema(groupSchemaCreate), GroupController.postGroup);
groupRouter.get('/groups', verifyRole(3), GroupController.getAllGroups);
groupRouter.get('/groups/:id', verifyRole(3), GroupController.getGroupById);
groupRouter.put('/groups/:id', verifyRole(2), validateSchema(groupSchemaUpdate), GroupController.putGroup);
groupRouter.delete('/groups/:id', verifyRole(2), GroupController.deleteGroup);

export default groupRouter;

