import { Op, QueryTypes, Sequelize, where } from "sequelize";
import { CategoryModel, ProductModel, QuantityModel } from "../models";
import utils, { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();

class CategoryController {
  async GetCategories(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      const data = await CategoryModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: [["updatedAt", "DESC"]],
        include: [ProductModel],
      });

      const total = await CategoryModel.count();

      requestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
  async AddCategory(req, res) {
    try {
      const category = req.body;

      if (
        category == null ||
        ("" + category.name).length === 0 ||
        ("" + category.bannerCode).length === 0
      ) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      category.code = `CA-${utils.generateUniqueString(6)}`;

      const categoryObj = await CategoryModel.create(category);
      await categoryObj.save();

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async UpdateCategory(req, res) {
    try {
      const category = req.body;

      if (
        category == null ||
        ("" + category.name).length === 0 ||
        ("" + category.code).length === 0 ||
        ("" + category.bannerCode).length === 0
      ) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      await CategoryModel.update(category, {
        where: {
          id: category.id,
        },
      });

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async DeleteCategory(req, res) {
    try {
      const category = req.body;

      if (
        category == null ||
        ("" + category.name).length === 0 ||
        ("" + category.code).length === 0
      ) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      await CategoryModel.destroy({
        where: {
          id: category.id,
        },
      });

      await ProductModel.destroy({
        where: {
          categoryId: category.id,
        },
      });

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async GetCategoriesByBannerCode(req, res) {
    try {
      const { code: bannerCode } = req.query;

      const records = await CategoryModel.findAll({
        where: {
          bannerCode: bannerCode,
        },
        include: [
          {
            model: ProductModel,
            include: [QuantityModel],
          }
        ],
      });

      requestHandler.sendSucceed(res, records);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async GetCategoryByCode(req, res) {
    try {
      const { code } = req.query;

      const record = await CategoryModel.findOne({
        where: {
          code,
        },
        include: [
          {
            model: ProductModel,
            include: [QuantityModel],
          }
        ],
      });

      requestHandler.sendSucceed(res, record);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

}

export default new CategoryController();
