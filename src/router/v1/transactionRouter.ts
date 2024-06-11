import * as express from "express";
import { TransactionController } from "../../controllers";
const router = express.Router();

router.get("/get", TransactionController.Get);

//CreatePaymentUrl

export default router;
