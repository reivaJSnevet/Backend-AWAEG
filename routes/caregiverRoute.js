import caregiverController from "../controllers/caregiverController.js";
import express from "express";
import validateModel from "../middlewares/validateModel.js";
import { Caregiver } from "../models/index.js";
import verifyRole from "../middlewares/verifyRole.js";

const caregiverRouter = express.Router();

caregiverRouter.post(
	"/caregivers",
	validateModel(Caregiver),
	caregiverController.postCaregiver,
);

caregiverRouter.get("/caregivers", verifyRole(2), caregiverController.getAllCaregivers);
caregiverRouter.get("/caregivers/:id", verifyRole(2), caregiverController.getCaregiverById);
caregiverRouter.put("/caregivers/:id", verifyRole(2), validateModel(Caregiver), caregiverController.putCaregiver);
caregiverRouter.delete("/caregivers/:id", verifyRole(2), caregiverController.deleteCaregiver);

export default caregiverRouter;