import * as express from "express";
import { VnpayTransactionController } from "../../controllers";
import { ROLES } from "../../constants";
import { verifyTokenMiddleware } from "../../middlewares";
const router = express.Router();

router.post(
  "/create-payment-url",
  verifyTokenMiddleware([ROLES.MEMBER]),
  VnpayTransactionController.CreatePaymentUrl
);
router.post(
  "/get-return-result",
  verifyTokenMiddleware([ROLES.MEMBER]),
  VnpayTransactionController.Return
);
router.get("/ipn", VnpayTransactionController.IPN);

export default router;
