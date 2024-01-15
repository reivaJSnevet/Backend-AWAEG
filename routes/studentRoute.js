import express from 'express';
import StudentController from '../controllers/studentController.js';
import verifyRole from '../middlewares/verifyRole.js';
import validateSchema from '../middlewares/validationMiddleware.js';
import { studentSchemaCreate, studentSchemaUpdate } from '../models/Schemas/studentSchema.js';

const studentRouter = express.Router();

studentRouter.post('/students', verifyRole(1), validateSchema(studentSchemaCreate), StudentController.postStudent);
studentRouter.get('/students', verifyRole(1), StudentController.getAllStudents);
studentRouter.get('/students/:id', verifyRole(1), StudentController.getStudentById);
studentRouter.put('/students/:id', verifyRole(1), validateSchema(studentSchemaUpdate), StudentController.putStudent);
studentRouter.delete('/students/:id', verifyRole(1), StudentController.deleteStudent);

export default studentRouter;