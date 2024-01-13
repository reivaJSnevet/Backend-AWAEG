import express from 'express';
import timetableController from '../controllers/timetableController.js';
import verifyRole from '../middlewares/verifyRole.js';

const timetableRouter = express.Router();

timetableRouter.post('/timetables', verifyRole(1), timetableController.postTimeTable); 
timetableRouter.get('/timetables', verifyRole(1), timetableController.getTimeTables);
timetableRouter.get('/timetables/:id', verifyRole(1), timetableController.getTimeTableById);
timetableRouter.put('/timetables/:id', verifyRole(1), timetableController.updateTimeTable);
timetableRouter.delete('/timetables/:id', verifyRole(1), timetableController.deleteTimeTable);

export default timetableRouter;