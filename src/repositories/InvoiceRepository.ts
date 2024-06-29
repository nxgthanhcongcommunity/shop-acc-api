import { Optional } from "sequelize";
import {
  AccountModel,
  BalanceModel,
  InvoiceDetailModel,
  InvoiceModel,
  ProductModel,
  QuantityModel,
  SendMailModel,
} from "../models";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { IInvoiceCreationAttributes } from "../models/invoiceModel";
import { IInvoiceDetailCreationAttributes } from "models/invoiceDetailModel";
import { ISendMailCreationAttributes } from "models/sendMailModel";

interface ICreateInvoiceReq
  extends Optional<
    IInvoiceCreationAttributes,
    NullishPropertiesOf<IInvoiceCreationAttributes>
  > {}
interface IUpdateBalanceReq {
  accountId: number;
  amount: number;
}

class InvoiceRepository {
  CreateInvoice = async (req: ICreateInvoiceReq) => {
    const record = await InvoiceModel.create(req);
    return record;
  };

  BulkCreateInvoiceDetails = async (
    req: IInvoiceDetailCreationAttributes[]
  ) => {
    await InvoiceDetailModel.bulkCreate(req);
    return true;
  };

  UpdateBalance = async (req: IUpdateBalanceReq) => {
    await BalanceModel.decrement("amount", {
      by: req.amount,
      where: {
        accountId: req.accountId,
      },
    });
    return true;
  };

  UpdateProductQuantity = async (req) => {
    await QuantityModel.increment(
      {
        currentQuantity: -1 * req.quantity,
        soldQuantity: req.quantity,
      },
      {
        where: {
          productId: req.productId,
        },
      }
    );
    return true;
  };

  CreateSendMail = async (req: ISendMailCreationAttributes) => {
    await SendMailModel.create(req);
    return true;
  };

  SendMail = async (req: ISendMailCreationAttributes) => {
    await SendMailModel.create(req);
    return true;
  };

  GetAllInvoices = async (req) => {
    const { page, limit, include = [AccountModel] } = req;

    const records = await InvoiceModel.findAll({
      offset: page > 0 ? (page - 1) * limit : null,
      limit: limit > 0 ? limit : null,
      order: [["updatedAt", "DESC"]],
      include,
    });

    return records;
  };

  GetAllInvoiceDetails = async (req) => {
    const { page, limit, include = [InvoiceModel, ProductModel] } = req;

    const records = await InvoiceDetailModel.findAll({
      order: [["updatedAt", "DESC"]],
      include,
    });

    return records;
  };

  CountAll = async () => {
    return await InvoiceModel.count();
  };

  GetInvoiceDetailsByInvoiceId = async (req) => {
    const records = await InvoiceDetailModel.findAll({
      where: {
        invoiceId: req.invoiceId,
      },
      include: [ProductModel],
    });

    return records;
  };

  GetInvoiceByCode = async (req) => {
    const { code, include } = req;

    const record = await InvoiceModel.findOne({
      where: {
        code,
      },
      include,
    });

    return record;
  };

  GetInvoicesByAccountIdAsync = async (
    accountId: number,
    page?: number,
    limit?: number
  ) => {
    const records = await InvoiceModel.findAll({
      offset: page > 0 ? (page - 1) * limit : null,
      limit: limit > 0 ? limit : null,
      order: [["updatedAt", "DESC"]],
      where: {
        accountId,
      },
      include: [
        {
          model: InvoiceDetailModel,
          include: [ProductModel],
        },
      ],
    });

    return records;
  };
}

export default InvoiceRepository;
