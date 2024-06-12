import { AccountBusiness } from "../business";
import BaseController from "./BaseController";

class AccountController extends BaseController {

  _accountBusiness = new AccountBusiness();

  GetAccounts = async (req, res) =>
    this.ProcessAsync(res, () => this._accountBusiness.GetAccounts(req.query));

  GetNotifications = async (req, res) =>
    this.ProcessAsync(res, () => this._accountBusiness.GetNotifications(req));

  GetAccountBalanceByCode = async (req, res) =>
    this.ProcessAsync(res, () => this._accountBusiness.GetAccountBalanceByCode(req.query));

  MarkNotificationsRead = async (req, res) =>
    this.ProcessAsync(res, () => this._accountBusiness.MarkNotificationsRead(req));

}

export default AccountController;
