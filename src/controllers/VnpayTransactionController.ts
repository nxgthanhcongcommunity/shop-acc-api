import { VnpayTransactionBusiness } from "../business";
import BaseController from "./BaseController";

class VnpayTransactionController extends BaseController {
  _business = new VnpayTransactionBusiness();
  CreatePaymentUrl = async (req, res) => {


    this.ProcessAsync(res, () =>
      this._business.CreatePaymentUrl(req)
    );
  };

  Return = async (req, res) => {
    this.ProcessAsync(res, () =>
      this._business.Return(req)
    );
  };

  IPN = async (req, res) => {
    this.ProcessAsync(res, () =>
      this._business.IPN(req)
    );
  };

}

export default new VnpayTransactionController();
