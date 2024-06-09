import * as express from "express";
import { AccountController } from "../../controllers";
const router = express.Router();

router.get("/get-accounts", AccountController.GetAccounts);
router.get("/get-balances", AccountController.GetBalances);
router.get(
  "/get-balance-by-accountId",
  AccountController.GetBalanceByAccountId
);

export default router;
