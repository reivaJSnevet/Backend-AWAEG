import { Router } from 'express';
import upload from "../middlewares/multerConfig.js"
import FileController from '../controllers/fileController.js';

const fileRouter = Router();

fileRouter.post('/files', upload.single("file"), FileController.postFile);
fileRouter.get('/files/:section', FileController.getAllFiles);
fileRouter.get('/files/:id/download',FileController.getFileById);
fileRouter.put('/files/:id', FileController.putFile);
fileRouter.delete('/files/:id', FileController.deleteFile);

export default fileRouter;