import { ITransactionCreationAttributes } from "models/transactionModel";
import { TransactionModel } from "../models";

class TransactionRepository {
  CreateTransaction = async (reqModel: ITransactionCreationAttributes) => {
    const record = await TransactionModel.create(reqModel);
    return record;
  };

  GetTransactionByRef = async (reqModel) => {
    const { refNo } = reqModel;
    const record = await TransactionModel.findOne({
      where: {
        refNo,
      },
    });
    return record;
  };

  GetTransactionHistoryAsync = async (reqModel) => {
    const { accountId } = reqModel;
    const records = await TransactionModel.findAll({
      where: {
        accountId,
      },
      attributes: { exclude: ['raw'] },
      order: [["createdAt", "desc"]],
    });
    return records;
  };
}

export default TransactionRepository;
