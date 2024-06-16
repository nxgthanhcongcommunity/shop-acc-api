import { AccountModel, VnpayTransactionModel } from "../models";
import { IVnpayTransactionCreationAttributes } from "models/vnpayTransactionModel";

class VnpayTransactionRepository {
  CreateVnpayTransaction = async (
    reqModel: IVnpayTransactionCreationAttributes
  ) => {
    const record = await VnpayTransactionModel.create(reqModel);
    return record;
  };

  GetVnpayTransactionByRef = async (reqModel) => {
    const { vnp_TxnRef } = reqModel;
    const record = await VnpayTransactionModel.findOne({
      where: {
        vnp_TxnRef,
      },
      include: [AccountModel],
    });
    return record;
  };
}

export default VnpayTransactionRepository;
