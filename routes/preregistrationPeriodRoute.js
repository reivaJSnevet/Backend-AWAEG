import { Router } from "express";
import preregistrationPeriodController from "../controllers/preregistrationPeriodController.js";

const preregistrationPeriodRouter = Router();

preregistrationPeriodRouter.get("/preregistrationPeriods/activate", preregistrationPeriodController.activate);
preregistrationPeriodRouter.get("/preregistrationPeriods/deactivate", preregistrationPeriodController.deactivate);
preregistrationPeriodRouter.get("/preregistrationPeriods/state", preregistrationPeriodController.state);

export default preregistrationPeriodRouter;