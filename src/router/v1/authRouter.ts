import * as express from "express";
import { AuthController } from "../../controllers";
import { AuthValidator } from "../../validators";
const router = express.Router();
const authValidator = new AuthValidator();

router.post(
  "/google",
  authValidator.HandleGoggleLoginAsync,
  AuthController.HandleGoggleLoginAsync
);
router.post(
  "/refresh",
  authValidator.RefreshTokenAsync,
  AuthController.RefreshTokenAsync
);

export default router;
