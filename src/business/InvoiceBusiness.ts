import { IInvoiceDetailCreationAttributes } from "models/invoiceDetailModel";
import { InvoiceDetailModel, InvoiceModel, ProductModel } from "../models";
import { AccountRepository, InvoiceRepository } from "../repositories";
import utils, { logUtils, validateUtils } from "../utils";
import BaseBusiness from "./BaseBusiness";

interface ICreateReq {
  invoice: {
    totalAmount: number;
    accountCode: string;
  };
  invoiceDetails: {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}

class InvoiceBusiness {
  _invoiceRepository = new InvoiceRepository();
  _accountRepository = new AccountRepository();

  Create = async (req) => {
    try {
      debugger;
      const { invoice, invoiceDetails }: ICreateReq = req.body;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        invoice.accountCode
      );
      if (account == null) return BaseBusiness.Error("Account do not exist!!");

      const createdInvoice = await this._invoiceRepository.CreateInvoice({
        totalAmount: invoice.totalAmount,
        accountId: account.id,
        code: `INV-${utils.generateUniqueString(6)}`,
        discount: 0,
        paymentStatus: "SUCCEED",
        paymentMethod: "DIAMOND",
      });

      const invoiceDetailsObj: IInvoiceDetailCreationAttributes[] =
        invoiceDetails.map((item) => ({
          ...item,
          invoiceId: createdInvoice.id,
        }));
      await this._invoiceRepository.BulkCreateInvoiceDetails(invoiceDetailsObj);

      await this._invoiceRepository.UpdateBalance({
        accountId: account.id,
        amount: invoice.totalAmount,
      });

      const countOfDetails = invoiceDetails.length;
      for (let i = 0; i < countOfDetails; i++) {
        const currentDetail = invoiceDetails[i];

        await this._invoiceRepository.UpdateProductQuantity({
          quantity: currentDetail.quantity,
          productId: currentDetail.productId,
        });
      }

      await this._invoiceRepository.CreateSendMail({
        from: "ngthanhcong666@gmail.com",
        to: "nxgthanhcongcommunity@gmail.com",
        subject: "[SHPACC]",
        text: "... have a good day",
        succeed: false,
        attempTimes: 0,
      });

      // const result = await transporter.sendMail({
      //   ...mailOptions,
      //   to: "nxgthanhcongcommunity@gmail.com",
      // });

      return BaseBusiness.Success(createdInvoice);
    } catch (ex) {
      console.log(ex);
      return BaseBusiness.Error();
    }
  };

  GetAll = async (req) => {
    try {
      const { page, limit } = req.query;

      const records = await this._invoiceRepository.GetAllInvoices({
        page,
        limit,
      });
      const total = await this._invoiceRepository.CountAll();

      return BaseBusiness.Success({ records, total });
    } catch (ex) {
      return BaseBusiness.Error();
    }
  };

  GetInvoiceDetails = async (req) => {
    try {
      const records = await this._invoiceRepository.GetAllInvoiceDetails({});
      return BaseBusiness.Success({ records, total: 0 });
    } catch (ex) {
      console.log(ex);
      return BaseBusiness.Error();
    }
  };

  GetInvoiceDetailsByInvoiceId = async (req) => {
    try {
      const { invoiceCode } = req.query;

      const invoice = await this._invoiceRepository.GetInvoiceByCode(
        invoiceCode
      );
      if (invoice == null) return BaseBusiness.Error("Invoice do not exist!!");

      const records =
        await this._invoiceRepository.GetInvoiceDetailsByInvoiceId(invoice.id);

      return BaseBusiness.Success({ records, total: 0 });
    } catch (ex) {
      console.log(ex);
      return BaseBusiness.Error();
    }
  };

  GetInvoiceByCode = async (req) => {
    try {
      const { invoiceCode } = req.query;

      const record = await this._invoiceRepository.GetInvoiceByCode({
        code: invoiceCode,
        include: [
          {
            model: InvoiceDetailModel,
            include: [ProductModel],
          },
        ],
      });

      return BaseBusiness.Success(record);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  GetPurchaseHistoryAsync = async (req) => {
    try {
      const { accountCode } = req.query;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );
      if (account == null)
        return BaseBusiness.ClientError("User không tồn tại trong hệ thống!!");

      const records = await this._invoiceRepository.GetInvoicesByAccountIdAsync(
        account.id
      );
      const total = records.length;

      return BaseBusiness.Success({
        total,
        records,
      });
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };
}

export default InvoiceBusiness;
