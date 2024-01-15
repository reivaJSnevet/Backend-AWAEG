import express from "express";
import caregiverController from "../controllers/caregiverController.js";
import verifyRole from "../middlewares/verifyRole.js";
import validateSchema from "../middlewares/validationMiddleware.js";
import { caregiverSchemaCreate, caregiverSchemaUpdate } from "../models/Schemas/caregiverSchema.js";

const caregiverRouter = express.Router();

caregiverRouter.post("/caregivers", validateSchema(caregiverSchemaCreate), caregiverController.postCaregiver);
caregiverRouter.get("/caregivers", verifyRole(2), caregiverController.getAllCaregivers);
caregiverRouter.get("/caregivers/:id", verifyRole(2), caregiverController.getCaregiverById);
caregiverRouter.put("/caregivers/:id", verifyRole(2), validateSchema(caregiverSchemaUpdate), caregiverController.putCaregiver);
caregiverRouter.delete("/caregivers/:id", verifyRole(2), caregiverController.deleteCaregiver);

export default caregiverRouter;