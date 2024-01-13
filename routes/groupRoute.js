import express from 'express';
import GroupController from '../controllers/groupController.js';
import validateModel from '../middlewares/validateModel.js';
import {Group} from '../models/index.js';
import verifyRole from '../middlewares/verifyRole.js';

const groupRouter = express.Router();

groupRouter.post('/groups', verifyRole(2), validateModel(Group), GroupController.postGroup);
groupRouter.get('/groups', verifyRole(3), GroupController.getAllGroups);
groupRouter.get('/groups/:id', verifyRole(3), GroupController.getGroupById);
groupRouter.put('/groups/:id', verifyRole(2), validateModel(Group), GroupController.putGroup);
groupRouter.delete('/groups/:id', verifyRole(2), GroupController.deleteGroup);

export default groupRouter;

