import express from 'express';
import StudentController from '../controllers/studentController.js';
import validateModel from '../middlewares/validateModel.js';
import {Student} from '../models/index.js';
import verifyRole from '../middlewares/verifyRole.js';

const studentRouter = express.Router();

studentRouter.post('/students', verifyRole(1), validateModel(Student) , StudentController.postStudent);
studentRouter.get('/students', verifyRole(1), StudentController.getAllStudents);
studentRouter.get('/students/:id', verifyRole(1), StudentController.getStudentById);
studentRouter.put('/students/:id', verifyRole(1), validateModel(Student), StudentController.putStudent);
studentRouter.delete('/students/:id', verifyRole(1), StudentController.deleteStudent);

export default studentRouter;