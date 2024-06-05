import * as express from "express";
import { BalanceController } from "../../controllers";
const router = express.Router();

router.get("/query", BalanceController.Query);
router.get("/get", BalanceController.Get);

export default router;
