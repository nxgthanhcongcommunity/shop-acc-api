import { AccountBusiness } from "../business";
import BaseController from "./BaseController";

class AccountController extends BaseController {

  _accountBusiness = new AccountBusiness();

  GetAccounts = async (req, res) =>
    this.ProcessAsync(res, () => this._accountBusiness.GetAccounts(req.query));

  GetAccountBalanceByCode = async (req, res) =>
    this.ProcessAsync(res, () => this._accountBusiness.GetAccountBalanceByCode(req.query));

}

export default AccountController;
