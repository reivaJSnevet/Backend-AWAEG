import express from "express";
import authController from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/auth/login', authController.login);
authRouter.get('/auth/logout', authController.logout);
authRouter.get('/auth/refresh-token', authController.handleRefreshToken);

export default authRouter;
