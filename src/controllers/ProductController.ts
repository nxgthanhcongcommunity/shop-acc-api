import { Op, } from "sequelize";
import { CategoryModel, ProductModel, QuantityModel } from "../models";
import utils, { RequestHandler } from "../utils";

class ProductController {
  async GetProducts(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      const data = await ProductModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        where: {
          name: {
            [Op.like]: `%${name}%`
          },
        },
        order: [["updatedAt", "DESC"]],
        include: [QuantityModel, CategoryModel],

      });

      const total = await ProductModel.count();

      RequestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }

  async AddProduct(req, res) {
    try {

      const product = req.body;

      const { quantity } = product;

      product.code = `PRD-${utils.generateUniqueString(6)}`;

      const productObj = await ProductModel.create(product);
      await QuantityModel.create({
        productId: productObj.id,
        currentQuantity: quantity.currentQuantity,
      });

      RequestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }

  async UpdateProduct(req, res) {
    try {
      const product = req.body;
      const { quantity } = product;

      await ProductModel.update(
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
          categoryId: product.categoryId,
        },
        {
          where: {
            id: product.id,
          },
        }
      );

      await QuantityModel.update(quantity,
        {
          where: {
            productId: quantity.productId,
          },
        }
      )
      RequestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }

  async DeleteProduct(req, res) {
    try {
      const product = req.body;

      if (product == null) {
        RequestHandler.sendClientError(res, "invalid input");
        return;
      }

      await ProductModel.destroy({
        where: {
          id: product.id,
        },
      });

      await QuantityModel.destroy(
        {
          where: {
            productId: product.id,
          },
        }
      )

      RequestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }

  async GetProductsByCategoryCode(req, res) {
    try {
      const { page, limit, categoryCode } = req.query;



      const data = await ProductModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit > 0 ? limit : null,
        where: categoryCode,
        order: [["updatedAt", "DESC"]],
      });

      const total = await ProductModel.count();

      RequestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
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
        include: [QuantityModel]
      });

      RequestHandler.sendSucceed(res, { product, relatedProducts });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }
}

export default new ProductController();
