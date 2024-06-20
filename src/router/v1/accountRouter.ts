import * as express from "express";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLES } from "../../constants";
import { AccountController } from "../../controllers";
const router = express.Router();
const accountController = new AccountController();

router.get("/get-accounts", verifyTokenMiddleware(ROLES.ADMIN), accountController.GetAccounts);
router.get("/get-account-by-code", verifyTokenMiddleware(ROLES.MEMBER), accountController.GetAccountByCode);

router.get("/get-notifications", verifyTokenMiddleware(ROLES.MEMBER), accountController.GetNotifications);
router.post("/mark-notifications-read", verifyTokenMiddleware(ROLES.MEMBER), accountController.MarkNotificationsRead);
router.get("/get-account-balance-by-code", verifyTokenMiddleware(ROLES.MEMBER), accountController.GetAccountBalanceByCode);

export default router;
