import { QueryTypes } from "sequelize";
import { BalanceModel, TransactionModel } from "../models";
import { RequestHandler } from "../utils";
import { sequelize } from "../db";
const requestHandler = new RequestHandler();

class TransactionController {
  async SEPaymentHook(req, res) {
    try {

      const transactionObj = await TransactionModel.create({
        gateway: req.body.gateway,
        transactionDate: req.body.transactionDate,
        accountNumber: req.body.accountNumber,
        code: req.body.code,
        content: req.body.content,
        transferType: req.body.transferType,
        transferAmount: req.body.transferAmount,
        accumulated: req.body.accumulated,
        subAccount: req.body.subAccount,
        referenceCode: req.body.referenceCode,
        description: req.body.description,
        transactionIdAtProvider: req.body.id,
        raw: JSON.stringify(req.body),
      });

      const result = await transactionObj.save();

      const balance = await BalanceModel.findOne({ where: { accountId: 1 } });

      if (balance) {
        await BalanceModel.increment(
          'amount',
          {
            by: 2000000000,
            where: {
              accountId: 1,
            },
          },
        );
      } else {
        await BalanceModel.create(
          { accountId: 1, amount: 1000000000 },
        );
      }

      // requestHandler.sendSucceed(res, );
      res.send({ success: true });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async Get(req, res) {
    try {

      const { page, limit, name = "" } = req.query;

      const records = await sequelize.query(
        `
        SELECT 
          id, 
          "transactionIdAtProvider", 
          gateway, 
          "transactionDate", 
          "accountNumber", 
          code, 
          content, 
          "transferType", 
          "transferAmount", 
          accumulated, 
          "subAccount", 
          "referenceCode", 
          description, 
          "createdAt",
          "updatedAt", 
          "raw"
        FROM 
          public."Transactions"
        -- limit :pLimit offet :pOffset
      `,
        {
          type: QueryTypes.SELECT,
        }
      );

      requestHandler.sendSucceed(res, { total: 0, data: records });

    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }

  }
}

export default new TransactionController();
