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
}

export default TransactionRepository;
