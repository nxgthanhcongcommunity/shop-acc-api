import * as express from "express";
import { TransactionController } from "../../controllers";
const router = express.Router();

router.post("/hooks/se-payment", TransactionController.SEPaymentHook);
router.get("/get", TransactionController.Get);

export default router;
