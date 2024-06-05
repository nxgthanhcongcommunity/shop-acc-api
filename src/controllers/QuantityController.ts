import { QueryTypes } from "sequelize";
import { RequestHandler } from "../utils";
import { sequelize } from "../db";
const requestHandler = new RequestHandler();

class QuantityController {

  async Get(req, res) {
    try {

      const { page, limit, name = "" } = req.query;

      const records = await sequelize.query(
        `
        select 
          p.name as "productName",
          p.code as "productCode",
          q."currentQuantity",
          q."soldQuantity",
          q."comingQuantity"
        from
          public."Products" p
          left join public."Quantities" q on q."productId" = p.id
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

export default new QuantityController();
