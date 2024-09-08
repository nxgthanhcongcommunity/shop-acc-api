import * as express from "express";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLES } from "../../constants";
import { AccountController } from "../../controllers";
import { AccountValidator } from "../../validators";
const router = express.Router();
const accountController = new AccountController();
const accountValidator = new AccountValidator();

router.get(
  "/get-all-accounts",
  verifyTokenMiddleware([ROLES.ADMIN]),
  accountController.GetAllAccountsAsync
);
router.get(
  "/get-account-by-code",
  verifyTokenMiddleware([ROLES.MEMBER]),
  accountValidator.GetAccountByCodeAsync,
  accountController.GetAccountByCodeAsync
);

router.get("/get-account-by-code1", accountController.GetAccountByCodeAsync1);

router.get(
  "/get-notifications",
  verifyTokenMiddleware([ROLES.MEMBER]),
  accountValidator.GetNotificationsByAccountCodeAsync,
  accountController.GetNotificationsByAccountCodeAsync
);
router.post(
  "/mark-notification-read-by-code",
  verifyTokenMiddleware([ROLES.MEMBER]),
  accountValidator.MarkNotificationReadByCodeAsync,
  accountController.MarkNotificationReadByCodeAsync
);
router.post(
  "/mark-notifications-read-by-account-code",
  verifyTokenMiddleware([ROLES.MEMBER]),
  accountValidator.MarkNotificationsReadByAccountCodeAsync,
  accountController.MarkNotificationsReadByAccountCodeAsync
);

export default router;
