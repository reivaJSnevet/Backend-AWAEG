import { Router } from 'express';
import timetableController from '../controllers/timetableController.js';

const timetableRouter = Router();

timetableRouter.post('/timetables', timetableController.postTimeTable); 
timetableRouter.get('/timetables', timetableController.getTimeTables);
timetableRouter.get('/timetables/:id', timetableController.getTimeTableById);
timetableRouter.put('/timetables/:id', timetableController.updateTimeTable);
timetableRouter.delete('/timetables/:id', timetableController.deleteTimeTable);

export default timetableRouter;