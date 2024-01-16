import express from "express";
import appointmentController from "../controllers/appointmentController.js";
import verifyRole from "../middlewares/verifyRole.js";
import validateSchema from "../middlewares/validationMiddleware.js";
import { appointmentSchemaCreate, appointmentSchemaUpdate } from "../models/Schemas/appointmentSchema.js";

const router = express.Router();

router.post("/appointments",  verifyRole(3), validateSchema(appointmentSchemaCreate), appointmentController.postAppointment);
router.get("/appointments", verifyRole(3), appointmentController.getAllAppointments);
router.get("/appointments/:id", verifyRole(3), appointmentController.getAppointmentById);
router.put("/appointments/:id", verifyRole(3), validateSchema(appointmentSchemaUpdate), appointmentController.putAppointment);
router.delete("/appointments/:id", verifyRole(3), appointmentController.deleteAppointment);

export default router;
