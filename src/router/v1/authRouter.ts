import * as express from "express";
import { AuthController } from "../../controllers";
const router = express.Router();

router.post("/google", AuthController.HandleGoggleLoginAsync);
router.post("/login", AuthController.LoginAsync);
router.post("/refresh", AuthController.RefreshTokenAsync);

export default router;
