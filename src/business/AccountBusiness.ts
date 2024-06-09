import { AccountModel, BalanceModel } from "../models";

interface IGetAccountsRequest {
  page: number;
  limit: number;
  name: string;
}

interface IGetAccountsResponse {
  total: number;
  data: AccountModel[];
}

interface IGetBalancesRequest {
  page: number;
  limit: number;
  name: string;
}

interface IGetBalancesResponse {
  total: number;
  data: AccountModel[];
}

class AccountBusiness {
  async GetAccounts(
    reqObj: IGetAccountsRequest
  ): Promise<IGetAccountsResponse> {
    const { page, limit, name } = reqObj;

    const data = await AccountModel.findAll({
      offset: page > 0 ? (page - 1) * limit : null,
      limit: limit || null,
      order: [["updatedAt", "DESC"]],
      include: [BalanceModel],
    });

    const total = await AccountModel.count();

    return { total, data };
  }

  async GetBalances(
    reqObj: IGetBalancesRequest
  ): Promise<IGetBalancesResponse> {
    const { page, limit, name = "" } = reqObj;

    // const records = await sequelize.query(
    //   `
    //   select
    //     a.Id as "accountId",
    //     b.Id as "balanceId",
    //     a.email,
    //     b.amount
    //   from
    //     public."Accounts" a
    //     left join public."Balances" b on a.id = b."accountId"
    //   order by
    //     b."updatedAt" desc
    //   -- limit :pLimit offet :pOffset
    // `,
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );

    const records = await AccountModel.findAll({
      offset: page > 0 ? (page - 1) * limit : null,
      limit: limit || null,
      // where: {
      //   name: {
      //     [Op.like]: `%${name}%`
      //   },
      // },
      order: [["updatedAt", "DESC"]],
      include: [BalanceModel],
    });

    return { total: 0, data: records };
  }
}

export default AccountBusiness;
