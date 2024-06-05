import * as express from "express";
import { SendMailController } from "../../controllers";
const router = express.Router();

router.get("/get", SendMailController.Get);

export default router;
