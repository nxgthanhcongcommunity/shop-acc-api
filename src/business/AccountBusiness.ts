import { IGetBalanceByAccountCodeReq, IGetNotificationsByAccountCodeReq } from "repositories/AccountRepository";
import {
  IGetAccountsResponse,
  IResponse
} from "../interfaces";
import { AccountModel } from "../models";
import { AccountRepository } from "../repositories";
import { logUtils, validateUtils } from "../utils";
import BaseBusiness from "./BaseBusiness";

class AccountBusiness {

  _accountRepository = new AccountRepository();

  GetAccounts = async (req): Promise<IResponse<IGetAccountsResponse>> => {
    try {

      const records = await this._accountRepository.GetAll(req.query);
      const total = await this._accountRepository.CountAll();

      return BaseBusiness.Success({ records, total });

    } catch (ex) {

      logUtils.logError(ex);
      return BaseBusiness.Error();

    }
  };

  GetAccountByCode = async (req) => {
    try {

      const { accountCode } = req.query;
      const record = await this._accountRepository.GetAccountByCode(accountCode);

      return BaseBusiness.Success(record);

    } catch (ex) {

      logUtils.logError(ex);
      return BaseBusiness.Error();

    }
  };

  GetAccountBalanceByCode = async (req): Promise<IResponse<AccountModel>> => {
    try {

      const reqModel = req.query as IGetBalanceByAccountCodeReq;

      if (validateUtils.isEmpty([reqModel.accountCode])) {
        return BaseBusiness.ClientError("f:accountCode can not empty!!");
      }

      const record = await this._accountRepository.GetBalanceByAccountCode(reqModel)

      return BaseBusiness.Success(record);

    } catch (ex) {

      logUtils.logError(ex);
      return BaseBusiness.Error();

    }
  };

  GetNotifications = async (req) => {
    try {

      const reqModel = req.query as IGetNotificationsByAccountCodeReq;

      if (validateUtils.isEmpty([reqModel.accountCode])) {
        return BaseBusiness.ClientError("f:accountCode can not empty!!");
      }

      const record = await this._accountRepository.GetNotificationsByAccountCode(reqModel);

      return BaseBusiness.Success(record);

    } catch (ex) {

      logUtils.logError(ex);
      return BaseBusiness.Error();

    }
  };

  MarkNotificationsRead = async (req) => {
    try {

      const { code, accountCode } = req.body;

      if (validateUtils.isEmpty([code, accountCode])) {
        return BaseBusiness.ClientError("f:code and f:accountCode can not empty at the same time!!");
      }

      if (accountCode != null && accountCode.length > 0) {

        const account = await this._accountRepository.GetAccountByCode(accountCode);
        if (account == null) return BaseBusiness.Error("Account is not exist!!");

        const result = await this._accountRepository.MarkNotificationRead({
          accountId: account.id,
        });

        return BaseBusiness.Success(result);
      }

      const result = await this._accountRepository.MarkNotificationRead({
        code,
      });

      return BaseBusiness.Success(result);

    } catch (ex) {

      logUtils.logError(ex);
      return BaseBusiness.Error();

    }
  };
}

export default AccountBusiness;
