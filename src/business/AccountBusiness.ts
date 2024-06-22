import { BalanceModel } from "../models";
import { AccountRepository } from "../repositories";
import { logUtils } from "../utils";
import BaseBusiness from "./BaseBusiness";

class AccountBusiness {
  _accountRepository = new AccountRepository();

  GetAllAccountsAsync = async (req) => {
    try {
      const { page, limit, include = [BalanceModel] } = req;

      const records = await this._accountRepository.GetAllAccountsAsync(
        page,
        limit,
        include
      );
      const total = await this._accountRepository.CountAllAsync();

      return BaseBusiness.Success({ records, total });
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  GetAccountByCodeAsync = async (req) => {
    try {
      const { accountCode } = req.query;

      const record = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );

      return BaseBusiness.Success(record);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  GetAccountBalanceByCodeAsync = async (req) => {
    try {
      const { accountCode } = req.query;

      const record = await this._accountRepository.GetAccountBalanceByCodeAsync(
        accountCode
      );

      return BaseBusiness.Success(record);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  GetNotificationsByAccountCodeAsync = async (req) => {
    try {
      const { accountCode } = req.query;

      const record =
        await this._accountRepository.GetNotificationsByAccountCodeAsync(
          accountCode
        );

      return BaseBusiness.Success(record);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  MarkNotificationReadByCodeAsync = async (req) => {
    try {
      const { notificationCode } = req.body;
      const result =
        await this._accountRepository.MarkNotificationReadByCodeAsync(
          notificationCode
        );

      return BaseBusiness.Success(result);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  MarkNotificationsReadByAccountCodeAsync = async (req) => {
    try {
      const { accountCode } = req.body;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );
      if (account == null) return BaseBusiness.Error("Account is not exist!!");

      const result = await this._accountRepository.MarkNotificationRead({
        accountId: account.id,
      });

      return BaseBusiness.Success(result);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };
}

export default AccountBusiness;
