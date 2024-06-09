import { InvoiceBusiness } from "../business";
import { RequestHandler } from "../utils";

const requestHandler = new RequestHandler();

class InvoiceController {
  async Create(req, res) {
    try {
      const { invoice, invoiceDetails } = req.body;
      const invoiceBusiness = new InvoiceBusiness();

      const rs = await invoiceBusiness.Create({ invoice, invoiceDetails });

      requestHandler.sendSucceed(res, rs);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async Get(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      // const records = await sequelize.query(
      //   `
      //   select
      //     a.Id as accountId,
      //     a.email,
      //     inv."totalAmount",
      //     inv.discount,
      //     inv."paymentStatus",
      //     inv."paymentMethod",
      //     inv."createdAt"
      //   from
      //     public."Invoices" inv
      //     inner join public."Accounts" a on a.Id = inv."accountId"
      //   -- limit :pLimit offet :pOffset
      // `,
      //   {
      //     type: QueryTypes.SELECT,
      //   }
      // );

      requestHandler.sendSucceed(res, { total: 0, data: [] });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async GetInvoiceDetails(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      // const records = await sequelize.query(
      //   `
      //   select
      //     inv.id as "invoiceId",
      //     p.id as "productId",
      //     ind.id as "invoiceDetailId",
      //     p.name,
      //     ind.quantity,
      //     ind."unitPrice",
      //     ind."totalPrice",
      //     ind."createdAt"
      //   from
      //     public."Invoices" inv
      //     inner join public."InvoiceDetails" ind on inv.Id = ind."invoiceId"
      //     inner join public."Products" p on ind."productId" = p.id
      //   -- limit :pLimit offet :pOffset
      // `,
      //   {
      //     type: QueryTypes.SELECT,
      //   }
      // );

      requestHandler.sendSucceed(res, { total: 0, data: [] });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
}

export default new InvoiceController();
