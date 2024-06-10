import * as express from "express";
import { AccountController } from "../../controllers";
const router = express.Router();
const accountController = new AccountController();

router.get("/get-accounts", accountController.GetAccounts);
router.get(
  "/get-account-balance-by-code",
  accountController.GetAccountBalanceByCode
);

export default router;
