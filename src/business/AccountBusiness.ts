import {
  IGetAccountBalanceByCodeRequest,
  IGetAccountsRequest,
  IGetAccountsResponse,
  IResponse
} from "../interfaces";
import {
  AccountModel,
  BalanceModel
} from "../models";
import BaseBusiness from "./BaseBusiness";

class AccountBusiness {

  GetAccounts = async (reqObj: IGetAccountsRequest): Promise<IResponse<IGetAccountsResponse>> => {

    try {

      const { page, limit, name } = reqObj;

      const data = await AccountModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        order: [["updatedAt", "DESC"]],
        include: [BalanceModel],
      });

      const total = await AccountModel.count();

      return BaseBusiness.Success({
        total,
        data
      })

    } catch (err) {
      return BaseBusiness.Error;
    }
  }

  GetAccountBalanceByCode = async (reqObj: IGetAccountBalanceByCodeRequest): Promise<IResponse<AccountModel>> => {

    try {
      const { code } = reqObj;

      const record = await AccountModel.findOne({
        where: {
          code,
        },
        include: [BalanceModel],
      });

      return BaseBusiness.Success(record);
    } catch (err) {
      return BaseBusiness.Error;
    }
  }


}

export default AccountBusiness;
