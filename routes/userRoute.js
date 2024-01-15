import express from 'express';
import userController from '../controllers/userController.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { userSchemCreate, userSchemaUpdate } from '../models/Schemas/userSchema.js';
import verifyRole from '../middlewares/verifyRole.js';

const userRouter = express.Router();

userRouter.post('/users', verifyRole(1), validateSchema(userSchemCreate) ,userController.postUser);
userRouter.get('/users', verifyRole(1), userController.getAllUsers);
userRouter.get('/users/:userName', verifyRole(1), userController.getUserByUserName);
userRouter.put('/users/:userName', verifyRole(1), validateSchema(userSchemaUpdate), userController.putUser);
userRouter.delete('/users/:userName', verifyRole(1), userController.deleteUser);

export default userRouter;