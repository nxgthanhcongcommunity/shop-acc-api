import { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();

class TransactionController {
  async SEPaymentHook(req, res) {
    try {
      console.log(req.headers["authorization"]);
      console.log(req.body);

      requestHandler.sendSucceed(res, "ok");
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
}

export default new TransactionController();
