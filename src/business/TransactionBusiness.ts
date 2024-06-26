import { TransactionModel } from "../models";
import { AccountRepository, TransactionRepository } from "../repositories";
import BaseBusiness from "./BaseBusiness";

class TransactionBusiness {
  _transactionRepository = new TransactionRepository();
  _accountRepository = new AccountRepository();

  GetTransactionHistoryAsync = async (req) => {
    try {
      const { accountCode } = req.query;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );
      if (account == null)
        return BaseBusiness.ClientError("Account not found!!");

      const records =
        await this._transactionRepository.GetTransactionHistoryAsync({
          accountId: account.id,
        });
      return BaseBusiness.Success(records);
    } catch (ex) {
      console.log(ex);
      return BaseBusiness.Error();
    }
  };

  GetAllTransactions = async (req) => {
    try {
      const records = await TransactionModel.findAll({
        order: [["createdAt", "desc"]],
      });
      return BaseBusiness.Success({ total: 0, records });
    } catch (ex) {
      console.log(ex);
      return BaseBusiness.Error();
    }
  };
}

export default TransactionBusiness;
