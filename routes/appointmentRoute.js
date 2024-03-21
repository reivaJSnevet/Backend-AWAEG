import { Router } from "express";
import appointmentController from "../controllers/appointmentController.js";

const appointmentRouter = Router();

appointmentRouter.post("/appointments", appointmentController.postAppointment);
appointmentRouter.get("/appointments", appointmentController.getAllAppointments);
appointmentRouter.get("/appointments/:id", appointmentController.getAppointmentById);
appointmentRouter.get("/appointments/functionary/:id", appointmentController.getAppointmentsByFunctionaryId);
appointmentRouter.put("/appointments/:id", appointmentController.putAppointment);
appointmentRouter.delete("/appointments/:id", appointmentController.deleteAppointment);

export default appointmentRouter;
