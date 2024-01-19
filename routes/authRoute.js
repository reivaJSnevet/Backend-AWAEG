import express from "express";
import authController from '../controllers/authController.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../models/Schemas/authSchema.js';

const authRouter = express.Router();

authRouter.post('/auth/login', validateSchema(loginSchema), authController.login);
authRouter.get('/auth/logout', authController.logout);
authRouter.get('/auth/refresh-token', authController.handleRefreshToken);
authRouter.get('/auth/email-confirmation/:token', authController.confirmEmail);
authRouter.post('/auth/forgot-password', validateSchema(forgotPasswordSchema), authController.forgotPassword);
authRouter.post('/auth/reset-password/:token', validateSchema(resetPasswordSchema), authController.resetPassword);


export default authRouter;
