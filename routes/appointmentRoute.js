import appointmentController from "../controllers/appointmentController.js";
import express from "express";
import verifyRole from "../middlewares/verifyRole.js";
import validateModel from "../middlewares/validateModel.js";
import { Appointment } from "../models/index.js";

const router = express.Router();

router.post("/appointments",  verifyRole(3), validateModel(Appointment), appointmentController.postAppointment);
router.get("/appointments", verifyRole(3), appointmentController.getAllAppointments);
router.get("/appointments/:id", verifyRole(3), appointmentController.getAppointmentById);
router.put("/appointments/:id", verifyRole(3), validateModel(Appointment), appointmentController.putAppointment);
router.delete("/appointments/:id", verifyRole(3), appointmentController.deleteAppointment);

export default router;
