import * as express from "express";
import { TestController } from "../../controllers";
const router = express.Router();
const testController = new TestController();

router.get("/", testController.TEST);

export default router;
