import { checkSchema } from "express-validator";

class AccountValidator {
  GetAccountByCodeAsync = checkSchema({
    accountCode: {
      notEmpty: {
        errorMessage: "accountCode can not be null!!",
      },
    },
  });

  GetNotificationsByAccountCodeAsync = checkSchema({
    accountCode: {
      notEmpty: {
        errorMessage: "accountCode can not be null!!",
      },
    },
  });
  GetAccountBalanceByCodeAsync = checkSchema({
    accountCode: {
      notEmpty: {
        errorMessage: "accountCode can not be null!!",
      },
    },
  });
  MarkNotificationReadByCodeAsync = checkSchema({
    notificationCode: {
      notEmpty: {
        errorMessage: "notificationCode can not be null!!",
      },
    },
  });
  MarkNotificationsReadByAccountCodeAsync = checkSchema({
    accountCode: {
      notEmpty: {
        errorMessage: "accountCode can not be null!!",
      },
    },
  });
}

export default AccountValidator;
