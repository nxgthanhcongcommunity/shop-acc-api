import { TransactionModel } from "../models";
import { RequestHandler } from "../utils";
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

      // requestHandler.sendSucceed(res, );
      res.send({ success: true });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
}

export default new TransactionController();
