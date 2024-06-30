import { SendMailModel } from "../models";
import { RequestHandler } from "../utils";

class SendMailController {
  async Get(req, res) {
    try {
      const records = await SendMailModel.findAll({
        order: [["updatedAt", "DESC"]],
      });

      return RequestHandler.sendSucceed(res, { total: 0, records });
    } catch (err) {
      console.log(err);
      return RequestHandler.sendError(res);
    }
  }
}

export default new SendMailController();
