import { AccountModel, BalanceModel } from "../models";
import { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();

class AccountController {

  async GetAccounts(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      const data = await AccountModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        order: [["updatedAt", "DESC"]],
        include: [BalanceModel]
      });

      const total = await AccountModel.count();

      requestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

}

export default new AccountController();
