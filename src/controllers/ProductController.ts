import { Op, Sequelize, where } from "sequelize";
import { CategoryModel, ProductModel } from "../models";
import utils, { RequestHandler } from "../utils";
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
      const childFiles = req.files["child-files"];
      const mainFile = req.files["main-file"];

      if (mainFile) {
        product.mainFileUrl = mainFile[0]?.filename;
      }
      if (childFiles) {
        product.childsFilesUrl = JSON.stringify(
          childFiles.map((childFile) => childFile.filename)
        );
      }

      product.code = `PRD-${utils.generateUniqueString(6)}`;

      const productObj = await ProductModel.create(product);
      await productObj.save();

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async UpdateProduct(req, res) {
    try {
      const product = req.body;

      const childFiles = req.files["child-files"];
      const mainFile = req.files["main-file"];

      if (mainFile) {
        product.mainFileUrl = mainFile[0]?.filename;
        product.mainFileCLDId = "";
      }
      if (childFiles) {
        product.childsFilesUrl = JSON.stringify(
          childFiles.map((childFile) => childFile.filename)
        );
        product.childsFilesCLDId = "";
      }

      const productObj = await ProductModel.update(
        {
          name: product.name,
          mainFileUrl: product.mainFileUrl,
          mainFileCLDId: product.mainFileCLDId,
          childsFilesUrl: product.childsFilesUrl,
          childsFilesCLDId: product.childsFilesCLDId,
          code: product.code,
          server: product.server,
          loginType: product.loginType,
          operatingSystem: product.operatingSystem,
          gemChono: product.gemChono,
          descriptions: product.descriptions,
          categoryCode: product.categoryCode,
        },
        {
          where: {
            id: product.id,
          },
        }
      );

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async DeleteProduct(req, res) {
    try {
      const product = req.body;

      if (product == null) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      await ProductModel.destroy({
        where: {
          id: product.id,
        },
      });

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async GetProductsByCategoryCode(req, res) {
    try {
      const { page, limit, name = "", code: categoryCode } = req.query;

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
          categoryCode: categoryCode,
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

  async GetProductCode(req, res) {
    try {
      const { code: productCode } = req.query;

      const product = await ProductModel.findOne({
        where: {
          code: productCode,
        },
        order: [["updatedAt", "DESC"]],
      });

      const relatedProducts = await ProductModel.findAll({
        offset: 0,
        limit: 4,
      });

      requestHandler.sendSucceed(res, { product, relatedProducts });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
}

export default new ProductController();
