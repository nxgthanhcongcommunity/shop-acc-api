import { QueryTypes } from "sequelize";
import { RequestHandler } from "../utils";
import { sequelize } from "../db";
const requestHandler = new RequestHandler();

class InvoiceDetailsController {

  async Get(req, res) {
    try {

      const { page, limit, name = "" } = req.query;

      const records = await sequelize.query(
        `
        select 
          inv.id as "invoiceId",
          p.id as "productId",
          ind.id as "invoiceDetailId",
          p.name,
          ind.quantity,
          ind."unitPrice",
          ind."totalPrice",
          ind."createdAt"
        from
          public."Invoices" inv
          inner join public."InvoiceDetails" ind on inv.Id = ind."invoiceId"
          inner join public."Products" p on ind."productId" = p.id
        -- limit :pLimit offet :pOffset
      `,
        {
          type: QueryTypes.SELECT,
        }
      );

      requestHandler.sendSucceed(res, { total: 0, data: records });

    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }

  }
}

export default new InvoiceDetailsController();
