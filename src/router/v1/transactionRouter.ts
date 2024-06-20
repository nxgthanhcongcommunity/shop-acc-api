import * as express from "express";
import { TransactionController } from "../../controllers";
import { verifyTokenMiddleware } from "middlewares";
import { ROLES } from "../../constants";
const router = express.Router();

router.get("/get", TransactionController.Get);
router.get("/get-transaction-history", TransactionController.GetTransactionHistoryAsync); //verifyTokenMiddleware([ROLES.MEMBER])

export default router;
