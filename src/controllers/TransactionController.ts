import { TransactionModel } from "../models";
import BaseController from "./BaseController";
import { AccountRepository, TransactionRepository } from "../repositories";

class TransactionController extends BaseController {
  _transactionRepository = new TransactionRepository();
  _accountRepository = new AccountRepository();

  Get = async (req, res) => {
    try {
      const records = await TransactionModel.findAll({
        order: [["createdAt", "desc"]],
      });
      return res.json({
        succeed: true,
        data: { total: 0, records },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetTransactionHistoryAsync = async (req, res) => {
    try {
      const { accountCode } = req.query;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );
      if (account == null)
        return res.json({
          succeed: false,
          message: "server error",
        });

      const records =
        await this._transactionRepository.GetTransactionHistoryAsync({
          accountId: account.id,
        });
      return res.json({
        succeed: true,
        data: records,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };
}

export default new TransactionController();
