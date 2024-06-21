import { Includeable, Optional } from "sequelize";
import { AccountModel, BalanceModel, NotificationModel } from "../models";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { IAccountCreationAttributes } from "models/accountModel";

export interface IGetAllReq {
  page: number;
  limit: number;
  include?: Includeable[];
}

export interface IGetBalanceByAccountCodeReq {
  accountCode: string;
}

export interface IGetNotificationsByAccountCodeReq {
  accountCode: string;
}

class AccountRepository {
  GetAll = async (req: IGetAllReq) => {
    const { page, limit, include = [BalanceModel] } = req;

    const records = await AccountModel.findAll({
      offset: page > 0 ? (page - 1) * limit : null,
      limit: limit > 0 ? limit : null,
      order: [["updatedAt", "DESC"]],
      include,
    });

    return records;
  };

  CountAll = async () => {
    return await AccountModel.count();
  };

  GetBalanceByAccountCode = async (req: IGetBalanceByAccountCodeReq) => {
    const { accountCode } = req;

    const record = await AccountModel.findOne({
      where: {
        code: accountCode,
      },
      include: [BalanceModel],
    });

    return record;
  };

  GetNotificationsByAccountCode = async (
    req: IGetNotificationsByAccountCodeReq
  ) => {
    const { accountCode } = req;

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

    return record;
  };

  MarkNotificationRead = async (req) => {
    const { code, accountId } = req;
    await NotificationModel.update(
      {
        isViewed: true,
      },
      {
        where: (() => {
          if (accountId != null) {
            return { accountId };
          }
          return { code };
        })(),
      }
    );
    return true;
  };

  GetAccountByCode = async (accountCode: string) => {
    const record = await AccountModel.findOne({
      where: {
        code: accountCode,
      },
    });

    return record;
  };

  GetAccountAtProvider = async (req) => {
    const record = await AccountModel.findOne({
      where: {
        idAtProvider: req.idAtProvider,
        providerName: req.providerName, //"google",
      },
    });

    return record;
  };

  CreateAccount = async (
    req: Optional<
      IAccountCreationAttributes,
      NullishPropertiesOf<IAccountCreationAttributes>
    >
  ) => {
    const record = await AccountModel.create(req);
    return record;
  };
}

export default AccountRepository;
