import { Op, Sequelize } from "sequelize";
import { AccountModel } from "../models";
import { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();

const readXlsxFile = require("read-excel-file/node");

class AccountController {

  async GetAccounts(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      const data = await AccountModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        // where: {
        //   givenName: {
        //     [Op.and]: [
        //       Sequelize.where(
        //         Sequelize.fn("LENGTH", Sequelize.col("name")),
        //         ">",
        //         0
        //       ),
        //       {
        //         [Op.like]: `%${name}%`,
        //       },
        //     ],
        //   },
        // },
        order: [["updatedAt", "DESC"]],
      });

      const total = await AccountModel.count();

      requestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

}

export default new AccountController();
