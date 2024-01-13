import express from 'express';
import userController from '../controllers/userController.js';
import validateModel from '../middlewares/validateModel.js';
import {User} from '../models/index.js';
import verifyRole from '../middlewares/verifyRole.js';

const userRouter = express.Router();

userRouter.post('/users', verifyRole(1), validateModel(User) ,userController.postUser);
userRouter.get('/users', verifyRole(1), userController.getAllUsers);
userRouter.get('/users/:userName', verifyRole(1), userController.getUserByUserName);
userRouter.put('/users/:userName', verifyRole(1), validateModel(User), userController.putUser);
userRouter.delete('/users/:userName', verifyRole(1), userController.deleteUser);

export default userRouter;