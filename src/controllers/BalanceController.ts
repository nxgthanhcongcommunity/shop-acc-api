import { BalanceModel } from "../models";
import { RequestHandler } from "../utils";
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
}

export default new BalanceController();
