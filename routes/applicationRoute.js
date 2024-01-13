import applicationController from "../controllers/applicationController.js";
import verifyRole from "../middlewares/verifyRole.js";
import { Router } from "express";

const router = Router();

router.get("/applications", verifyRole(1), applicationController.getAll);
router.get("/applications/:applicationId", verifyRole(1), applicationController.getById);
router.get("/applications/type/:type", verifyRole(1), applicationController.getByType);

export default router;