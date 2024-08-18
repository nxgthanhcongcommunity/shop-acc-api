import { AccountRepository, InvoiceRepository } from "../repositories";
import BaseController from "./BaseController";
import utils from "../utils";
import { IInvoiceDetailCreationAttributes } from "../models/invoiceDetailModel";
import { InvoiceDetailModel, ProductModel } from "../models";

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

class InvoiceController extends BaseController {
  _invoiceRepository = new InvoiceRepository();
  _accountRepository = new AccountRepository();

  Create = async (req, res) => {
    try {
      debugger;
      const { invoice, invoiceDetails }: ICreateReq = req.body;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        invoice.accountCode
      );
      if (account == null)
        return res.json({
          succeed: false,
          message: "server error",
        });

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
      return res.json({
        succeed: true,
        data: createdInvoice,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetAll = async (req, res) => {
    try {
      const { page, limit } = req.query;

      const records = await this._invoiceRepository.GetAllInvoices({
        page,
        limit,
      });
      const total = await this._invoiceRepository.CountAll();

      return res.json({
        succeed: true,
        data: { records, total },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetInvoiceDetails = async (req, res) => {
    try {
      const records = await this._invoiceRepository.GetAllInvoiceDetails({});
      return res.json({
        succeed: true,
        data: { records, total: 0 },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetInvoiceByCode = async (req, res) => {
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

      return res.json({
        succeed: true,
        data: record,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetPurchaseHistoryAsync = async (req, res) => {
    try {
      const { accountCode } = req.query;

      const account = await this._accountRepository.GetAccountByCodeAsync(
        accountCode
      );
      if (account == null)
        return res.json({
          succeed: false,
          message: "server error",
        });

      const records = await this._invoiceRepository.GetInvoicesByAccountIdAsync(
        account.id
      );
      const total = records.length;

      return res.json({
        succeed: true,
        data: {
          total,
          records,
        },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };
}

export default InvoiceController;
