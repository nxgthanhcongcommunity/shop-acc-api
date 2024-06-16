import { BalanceModel } from "../models";

interface IUpdateBalanceReq {
  accountId: number;
  amount: number;
}

class BalanceRepository {
  UpdateBalance = async (req: IUpdateBalanceReq) => {
    await BalanceModel.decrement("amount", {
      by: req.amount,
      where: {
        accountId: req.accountId,
      },
    });
    return true;
  };
}

export default BalanceRepository;
