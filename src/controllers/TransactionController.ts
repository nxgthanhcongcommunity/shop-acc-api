import { BalanceModel, TransactionModel } from "../models";
import { RequestHandler } from "../utils";
import BaseController from "./BaseController";

class TransactionController extends BaseController {
  /*
  
  async SEPaymentHook(req, res) {
    try {
      const reqObj = req.body;
      const accountId = reqObj.content.split(" ").slice(-1)[0];

      const transactionObj = await TransactionModel.create({
        gateway: reqObj.gateway,
        transactionDate: reqObj.transactionDate,
        accountNumber: reqObj.accountNumber,
        code: "" + reqObj.code,
        content: reqObj.content,
        transferType: reqObj.transferType,
        transferAmount: reqObj.transferAmount,
        accumulated: reqObj.accumulated,
        subAccount: reqObj.subAccount,
        referenceCode: reqObj.referenceCode,
        description: reqObj.description,
        transactionIdAtProvider: reqObj.id,
        raw: JSON.stringify(reqObj),
        accountId: accountId,
        succeed: true,
      });

      await BalanceModel.increment("amount", {
        by: reqObj.transferAmount,
        where: {
          accountId: accountId,
        },
      });

      // RequestHandler.sendSucceed(res, );
      res.send({ success: true });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }
  
  */

  async Get(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      // const records = await sequelize.query(
      //   `
      //   SELECT
      //     id,
      //     "transactionIdAtProvider",
      //     gateway,
      //     "transactionDate",
      //     "accountNumber",
      //     code,
      //     content,
      //     "transferType",
      //     "transferAmount",
      //     accumulated,
      //     "subAccount",
      //     "referenceCode",
      //     description,
      //     "createdAt",
      //     "updatedAt",
      //     "raw"
      //   FROM
      //     public."Transactions"
      //   -- limit :pLimit offet :pOffset
      // `,
      //   {
      //     type: QueryTypes.SELECT,
      //   }
      // );

      RequestHandler.sendSucceed(res, { total: 0, data: [] });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }
}

export default new TransactionController();
