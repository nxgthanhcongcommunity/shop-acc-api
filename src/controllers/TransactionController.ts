import { TransactionBusiness } from "../business";
import BaseController from "./BaseController";

class TransactionController extends BaseController {
  _transactionBusiness = new TransactionBusiness();

  Get = async (req, res) => {
    await this.ProcessAsync(req, res, async () =>
      this._transactionBusiness.GetAllTransactions(req)
    );
  };

  GetTransactionHistoryAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._transactionBusiness.GetTransactionHistoryAsync(req)
    );
}

export default new TransactionController();
