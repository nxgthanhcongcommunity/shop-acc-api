import { QueryTypes } from "sequelize";
import { RequestHandler } from "../utils";
import { sequelize } from "../db";
const requestHandler = new RequestHandler();

class SendMailController {

  async Get(req, res) {
    try {

      const { page, limit, name = "" } = req.query;

      const records = await sequelize.query(
        `
        select 
          s.from,
          s.to,
          s.subject,
          s.text,
          s."attempTimes",
          s.succeed,
          s."createdAt",
          s."updatedAt"
        from
          public."SendMails" s
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

export default new SendMailController();
