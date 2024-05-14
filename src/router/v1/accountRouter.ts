import * as express from "express";
import { AccountController } from "../../controllers";
const router = express.Router();

router.get("/get-accounts", AccountController.GetAccounts);

export default router;
