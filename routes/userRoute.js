import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoute = Router();

userRoute.post("/users", userController.postUser);
userRoute.get("/users", userController.getAllUsers);
userRoute.get("/users/:userName", userController.getUserByUserName);
userRoute.put("/users/:userName", userController.putUser);
userRoute.delete("/users/:userName", userController.deleteUser);

export default userRoute;
