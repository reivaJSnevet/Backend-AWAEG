import express from 'express';
import FileController from '../controllers/fileController.js';
import upload from "../middlewares/multerConfig.js"
import verifyRole from '../middlewares/verifyRole.js';

const fileRouter = express.Router();

fileRouter.post('/files', verifyRole(3), upload.single("file"), FileController.postFile);
fileRouter.get('/files/:section', verifyRole(5), FileController.getAllFiles);
fileRouter.get('/files/:id/dowload', verifyRole(5), FileController.getFileById);
fileRouter.put('/files/:id', verifyRole(3), FileController.putFile);
fileRouter.delete('/files/:id', verifyRole(3), FileController.deleteFile);

export default fileRouter;