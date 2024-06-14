import * as express from "express";
import { AuthController } from "../../controllers";
const router = express.Router();

router.post("/google", AuthController.HandleGoggleLoginAsync);

export default router;
