import { AccountBusiness } from "../business";
import BaseController from "./BaseController";

class AccountController extends BaseController {
  _accountBusiness = new AccountBusiness();

  GetAllAccountsAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._accountBusiness.GetAllAccountsAsync(req)
    );

  GetAccountByCodeAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._accountBusiness.GetAccountByCodeAsync(req)
    );

  GetNotificationsByAccountCodeAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._accountBusiness.GetNotificationsByAccountCodeAsync(req)
    );

  GetAccountBalanceByCodeAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._accountBusiness.GetAccountBalanceByCodeAsync(req)
    );

  MarkNotificationsReadByAccountCodeAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._accountBusiness.MarkNotificationsReadByAccountCodeAsync(req)
    );

  MarkNotificationReadByCodeAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._accountBusiness.MarkNotificationReadByCodeAsync(req)
    );
}

export default AccountController;
