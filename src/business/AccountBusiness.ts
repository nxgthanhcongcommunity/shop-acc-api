import {
  IGetAccountBalanceByCodeRequest,
  IGetAccountsRequest,
  IGetAccountsResponse,
  IResponse,
} from "../interfaces";
import { AccountModel, BalanceModel, NotificationModel } from "../models";
import BaseBusiness from "./BaseBusiness";

class AccountBusiness {
  GetAccounts = async (
    reqObj: IGetAccountsRequest
  ): Promise<IResponse<IGetAccountsResponse>> => {
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
        data,
      });
    } catch (err) {
      return BaseBusiness.Error();
    }
  };

  GetAccountBalanceByCode = async (
    reqObj: IGetAccountBalanceByCodeRequest
  ): Promise<IResponse<AccountModel>> => {
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
      return BaseBusiness.Error();
    }
  };

  GetNotifications = async (req) => {
    try {
      const { accountCode } = req.query;

      const record = await AccountModel.findOne({
        where: {
          code: accountCode,
        },
        include: [
          {
            model: NotificationModel,
            as: "notifications",
          },
        ],
        order: [
          [
            { model: NotificationModel, as: "notifications" },
            "createdAt",
            "desc",
          ],
        ],
      });

      return BaseBusiness.Success(record);
    } catch (err) {
      console.log(err);
      return BaseBusiness.Error();
    }
  };

  MarkNotificationsRead = async (req) => {
    try {
      const { code, accountCode } = req.query;

      // if (code == null || code.length == 0) {
      //   const record = await AccountModel.update({

      //   },{
      //     where: {
      //       code,
      //       accountCode,
      //     },
      //   });
      // }

      const record = await NotificationModel.update(
        {
          isViewed: true,
        },
        {
          where: {
            code,
          },
        }
      );

      return BaseBusiness.Success(true);
    } catch (err) {
      return BaseBusiness.Error();
    }
  };
}

export default AccountBusiness;
