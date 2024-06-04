import * as express from "express";
import { BalanceController } from "../../controllers";
const router = express.Router();

router.get("/query", BalanceController.Query);

export default router;
