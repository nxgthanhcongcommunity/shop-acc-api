import { QueryTypes } from "sequelize";
import { AccountModel, BalanceModel } from "../models";
import { RequestHandler } from "../utils";
import { sequelize } from "../db";
const requestHandler = new RequestHandler();

class BalanceController {
  async Query(req, res) {
    try {
      const { accountId } = req.query;

      const balance = await BalanceModel.findOne({ where: { accountId: accountId } });

      requestHandler.sendSucceed(res, balance);

    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async Get(req, res) {

    try {

      const { page, limit, name = "" } = req.query;

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

      requestHandler.sendSucceed(res, { total: 0, data: records });

    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }

  }
}

export default new BalanceController();
