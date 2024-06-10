import * as express from "express";
import { TransactionController } from "../../controllers";
const router = express.Router();

router.post("/hooks/se-payment", TransactionController.SEPaymentHook);
router.get("/get", TransactionController.Get);
router.post("/create-payment-url", TransactionController.CreatePaymentUrl);

//CreatePaymentUrl

export default router;
