import express from "express";
import refreshTokenController from "../controllers/refreshTokenController.js";

const refreshTokenRouter = express.Router();

refreshTokenRouter.get("/refresh", refreshTokenController.handleRefreshToken);

export default refreshTokenRouter;