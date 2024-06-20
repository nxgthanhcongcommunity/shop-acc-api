import { TransactionBusiness } from "../business";
import { RequestHandler } from "../utils";
import BaseController from "./BaseController";

class TransactionController extends BaseController {

  _transactionBusiness = new TransactionBusiness();

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

  GetTransactionHistoryAsync = async (req, res) =>
    this.ProcessAsync(res, () => this._transactionBusiness.GetTransactionHistoryAsync(req));

}

export default new TransactionController();
