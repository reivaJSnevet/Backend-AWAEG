import { Router } from "express";
import studentController from "../controllers/studentController.js";

const studentRouter = Router();

studentRouter.post("/students", studentController.postStudent);
studentRouter.get("/students", studentController.getAllStudents);
studentRouter.get("/students/:id", studentController.getStudentById);
studentRouter.put("/students/:id", studentController.putStudent);
studentRouter.delete("/students/:id", studentController.deleteStudent);

export default studentRouter;