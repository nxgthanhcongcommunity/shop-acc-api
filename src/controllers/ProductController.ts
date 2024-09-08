import { Op, QueryTypes } from "sequelize";
import {
  CategoryModel,
  ProductModel,
  QuantityModel,
  sequelize,
} from "../models";
import utils, { RequestHandler } from "../utils";
import BaseController from "./BaseController";

class ProductController extends BaseController {
  GetProductsByKeysAsync = async (req, res) => {
    try {
      const { categoryCode, column, direction } = req.query;

      let orderClause = "";

      if (
        ["code", "name", "price", "gemChono"].includes(column) &&
        ["ASC", "DESC"].includes(direction)
      ) {
        orderClause = `ORDER BY P."${column}" ${direction}`;
      }

      const records = await sequelize.query(
        `
        select 
          '' _
          , P."code"
          , P."mainFileCLDId"
          , P."name"
          , P."price"
          , Q."currentQuantity"
          , P."gemChono"
          , C."code" "categoryCode"
        from 
          "Products" P
          inner join "Quantities" Q on P."id" = Q."productId"
          inner join "Categories" C on P."categoryId" = C.id
        where
          C."code" = :categoryCode
          ${orderClause}
        `,
        {
          replacements: { categoryCode },
          type: QueryTypes.SELECT,
        }
      );

      return res.json({
        succeed: true,
        data: { records },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
        ex: ex,
      });
    }
  };

  async GetProducts(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      const records = await ProductModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: [["updatedAt", "DESC"]],
        include: [QuantityModel, CategoryModel],
      });

      const total = await ProductModel.count();
      return res.json({
        succeed: true,
        data: { total, records },
      });
    } catch (err) {
      return res.json({
        succeed: false,
        message: "server error",
      });
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

      return res.json({
        succeed: true,
        data: null,
      });
    } catch (err) {
      return res.json({
        succeed: false,
        message: "server error",
      });
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

      await QuantityModel.update(quantity, {
        where: {
          productId: quantity.productId,
        },
      });
      return res.json({
        succeed: true,
        data: null,
      });
    } catch (err) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  }

  async DeleteProduct(req, res) {
    try {
      const product = req.body;

      if (product == null) {
        return res.json({
          succeed: false,
          message: "server error",
        });
      }

      await ProductModel.destroy({
        where: {
          id: product.id,
        },
      });

      await QuantityModel.destroy({
        where: {
          productId: product.id,
        },
      });

      return res.json({
        succeed: true,
        data: null,
      });
    } catch (err) {
      return res.json({
        succeed: false,
        message: "server error",
      });
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

      return res.json({
        succeed: true,
        data: { total, data },
      });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }

  async GetProductByCode(req, res) {
    try {
      const { code: productCode } = req.query;

      const product = await ProductModel.findOne({
        where: {
          code: productCode,
        },
        order: [["updatedAt", "DESC"]],
        include: [CategoryModel],
      });

      const relatedProducts = await ProductModel.findAll({
        offset: 0,
        limit: 4,
        include: [QuantityModel],
      });

      return res.json({
        succeed: true,
        data: { product, relatedProducts },
      });
    } catch (err) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  }
}

export default new ProductController();
