import { IAccountCreationAttributes } from "models/accountModel";
import { Includeable, Optional, QueryTypes } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import {
  AccountModel,
  BalanceModel,
  NotificationModel,
  sequelize,
} from "../models";

class AccountRepository {
  GetAllAccountsAsync = async (
    page: number,
    limit: number,
    include: Includeable[]
  ) => {
    const records = await AccountModel.findAll({
      offset: page > 0 ? (page - 1) * limit : null,
      limit: limit > 0 ? limit : null,
      order: [["updatedAt", "DESC"]],
      include,
    });

    return records;
  };

  CountAllAsync = async () => {
    return await AccountModel.count();
  };

  GetNotificationsByAccountCodeAsync = async (accountCode: string) => {
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

  MarkNotificationReadByCodeAsync = async (notificationCode: string) => {
    await NotificationModel.update(
      {
        isViewed: true,
      },
      {
        where: { code: notificationCode },
      }
    );
    return true;
  };

  GetAccountByCodeAsync = async (accountCode: string) => {
    const record = await sequelize.query(
      `
      select 
        A.*, B.amount
      from 
        "Accounts" A
        left join "Balances" B on A.id = B."accountId"
      where 
        code = :accountCode
      `,
      {
        replacements: { accountCode },
        type: QueryTypes.SELECT,
      }
    );
    return record[0] as AccountModel;
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
