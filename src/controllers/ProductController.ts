import { Op, Sequelize, where } from "sequelize";
import { CategoryModel } from "../models";
import { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();

const readXlsxFile = require("read-excel-file/node");

class ProductController {
  async AddProduct(req, res) {
    try {
      const product = req.body;

      // if (
      //   category == null ||
      //   ("" + category.name).length === 0 ||
      //   ("" + category.code).length === 0 ||
      //   ("" + category.bannerCode).length === 0
      // ) {
      //   requestHandler.sendClientError(res, "invalid input");
      //   return;
      // }

      // const categoryObj = await CategoryModel.create(category);
      // await categoryObj.save();

      requestHandler.sendSucceed("ok");
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
}

export default new ProductController();
