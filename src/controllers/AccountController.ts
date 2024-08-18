import { BalanceModel } from "../models";
import BaseController from "./BaseController";
import { AccountRepository } from "../repositories";

class AccountController extends BaseController {
  _accountRepository = new AccountRepository();

  GetAllAccountsAsync = async (req, res) => {
    try {
      const { page, limit, include = [BalanceModel] } = req;

      const records = await this._accountRepository.GetAllAccountsAsync(
        page,
        limit,
        include
      );
      const total = await this._accountRepository.CountAllAsync();

      return res.json({
        succeed: true,
        data: { records, total },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetAccountByCodeAsync = async (req, res) => {
    try {
      const { accountCode } = req.query;

      const record = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );

      return res.json({
        succeed: true,
        data: record,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetNotificationsByAccountCodeAsync = async (req, res) => {
    try {
      const { accountCode } = req.query;

      const record =
        await this._accountRepository.GetNotificationsByAccountCodeAsync(
          accountCode
        );

      return res.json({
        succeed: true,
        data: record,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetAccountBalanceByCodeAsync = async (req, res) => {
    try {
      const { accountCode } = req.query;

      const record = await this._accountRepository.GetAccountBalanceByCodeAsync(
        accountCode
      );

      return res.json({
        succeed: true,
        data: record,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  MarkNotificationsReadByAccountCodeAsync = async (req, res) => {
    try {
      const { notificationCode } = req.body;
      const result =
        await this._accountRepository.MarkNotificationReadByCodeAsync(
          notificationCode
        );

      return res.json({
        succeed: true,
        data: result,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  MarkNotificationReadByCodeAsync = async (req, res) => {
    try {
      const { accountCode } = req.body;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );

      if (account == null)
        return res.json({
          succeed: false,
          message: "server error",
        });

      const result = await this._accountRepository.MarkNotificationRead({
        accountId: account.id,
      });

      return res.json({
        succeed: true,
        data: result,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };
}

export default AccountController;
