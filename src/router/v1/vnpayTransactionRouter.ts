import * as express from "express";
import { VnpayTransactionController } from "../../controllers";
const router = express.Router();

router.post("/create-payment-url", VnpayTransactionController.CreatePaymentUrl);
router.post("/get-return-result", VnpayTransactionController.Return);
router.get("/ipn", VnpayTransactionController.IPN);

//CreatePaymentUrl

export default router;
