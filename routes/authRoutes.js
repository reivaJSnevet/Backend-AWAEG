import express from "express";
import authController from "../controllers/authController.js";
import checkRole from "../middlewares/roleMiddleware.js";

const authRouter = express.Router();

// Rutas para Autenticación
authRouter.post("/auth/login", authController.login);
authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/verify", authController.verifyEmail);
authRouter.post("/auth/forgot-password", authController.forgotPassword);
authRouter.post("/auth/reset-password", authController.resetPassword);

export default authRouter;
