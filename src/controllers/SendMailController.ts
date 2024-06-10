import { RequestHandler } from "../utils";

class SendMailController {
  async Get(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      // const records = await sequelize.query(
      //   `
      //   select
      //     s.from,
      //     s.to,
      //     s.subject,
      //     s.text,
      //     s."attempTimes",
      //     s.succeed,
      //     s."createdAt",
      //     s."updatedAt"
      //   from
      //     public."SendMails" s
      //   -- limit :pLimit offet :pOffset
      // `,
      //   {
      //     type: QueryTypes.SELECT,
      //   }
      // );

      RequestHandler.sendSucceed(res, { total: 0, data: [] });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }
}

export default new SendMailController();