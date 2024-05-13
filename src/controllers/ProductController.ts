import { Op, Sequelize, where } from "sequelize";
import { CategoryModel, ProductModel } from "../models";
import { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();

const readXlsxFile = require("read-excel-file/node");

class ProductController {

  async GetProducts(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      const data = await ProductModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        where: {
          name: {
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn("LENGTH", Sequelize.col("name")),
                ">",
                0
              ),
              {
                [Op.like]: `%${name}%`,
              },
            ],
          },
        },
        order: [["updatedAt", "DESC"]],
      });

      const total = await ProductModel.count();

      requestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async AddProduct(req, res) {
    try {
      const product = req.body;
      const childFiles = req.files['child-files'];
      const mainFile = req.files['main-file'];

      product.mainFileUrl = mainFile[0]?.filename;
      product.childsFilesUrl = JSON.stringify(childFiles.map(childFile => childFile.filename));

      const productObj = await ProductModel.create(product);
      await productObj.save();

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

}

export default new ProductController();
