import { Router } from 'express';
import groupController from '../controllers/groupController.js';

const groupRouter = Router();

groupRouter.post('/groups', groupController.postGroup);
groupRouter.get('/groups', groupController.getAllGroups);
groupRouter.get('/groups/:id', groupController.getGroupById);
groupRouter.put('/groups/:id', groupController.putGroup);
groupRouter.delete('/groups/:id', groupController.deleteGroup);

export default groupRouter;