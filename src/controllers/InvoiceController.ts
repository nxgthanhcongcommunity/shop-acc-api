import { InvoiceBusiness } from "../business";
import BaseController from "./BaseController";

class InvoiceController extends BaseController {
  _invoiceBusiness = new InvoiceBusiness();

  Create = async (req, res) =>
    this.ProcessAsync(req, res, () => this._invoiceBusiness.Create(req));

  GetAll = async (req, res) =>
    this.ProcessAsync(req, res, () => this._invoiceBusiness.GetAll(req));

  GetInvoiceDetails = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._invoiceBusiness.GetInvoiceDetails(req)
    );

  GetInvoiceByCode = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._invoiceBusiness.GetInvoiceByCode(req)
    );

  GetPurchaseHistoryAsync = async (req, res) =>
    this.ProcessAsync(req, res, () =>
      this._invoiceBusiness.GetPurchaseHistoryAsync(req)
    );
}

export default new InvoiceController();
