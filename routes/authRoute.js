import express from "express";
import authController from '../controllers/authController.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { loginSchema } from '../models/Schemas/authSchema.js';

const authRouter = express.Router();

authRouter.post('/auth/login', validateSchema(loginSchema), authController.login);
authRouter.get('/auth/logout', authController.logout);
authRouter.get('/auth/refresh-token', authController.handleRefreshToken);
authRouter.get('/auth/email-confirmation/:token', authController.confirmEmail);

export default authRouter;
