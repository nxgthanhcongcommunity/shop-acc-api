import { Op, QueryTypes, Sequelize, where } from "sequelize";
import { CategoryModel, ProductModel, QuantityModel } from "../models";
import utils, { RequestHandler } from "../utils";
import BaseController from "./BaseController";

class CategoryController extends BaseController {
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

      RequestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }
  AddCategory = async (req, res) => {
    this.ProcessAsync(req, res, async () => {
      try {
        const { name, bannerCode, mainFileCLDId } = req.body;
        const code = `CA-${utils.generateUniqueString(6)}`;
        await CategoryModel.create({
          name,
          bannerCode,
          mainFileCLDId,
          code,
        });

        RequestHandler.sendSucceed(res);
      } catch (err) {
        console.log(err);
        RequestHandler.sendError(res);
      }
    });
  };

  UpdateCategory = async (req, res) => {
    this.ProcessAsync(req, res, async () => {
      try {
        const { id, name, bannerCode, mainFileCLDId } = req.body;
        await CategoryModel.update(
          {
            name,
            bannerCode,
            mainFileCLDId,
          },
          {
            where: {
              id,
            },
          }
        );

        RequestHandler.sendSucceed(res);
      } catch (err) {
        console.log(err);
        RequestHandler.sendError(res);
      }
    });
  };

  DeleteCategory = async (req, res) => {
    this.ProcessAsync(req, res, async () => {
      try {
        const { id } = req.body;

        await CategoryModel.destroy({
          where: {
            id,
          },
        });

        RequestHandler.sendSucceed(res);
      } catch (err) {
        console.log(err);
        RequestHandler.sendError(res);
      }
    });
  };

  GetCategoriesByBannerCode = async (req, res) => {
    this.ProcessAsync(req, res, async () => {
      try {
        const { bannerCode } = req.query;

        const records = await CategoryModel.findAll({
          where: {
            bannerCode,
          },
          include: [
            {
              model: ProductModel,
              include: [QuantityModel],
            },
          ],
        });

        RequestHandler.sendSucceed(res, records);
      } catch (err) {
        console.log(err);
        RequestHandler.sendError(res);
      }
    });
  };

  GetCategoryByCode = async (req, res) => {
    this.ProcessAsync(req, res, async () => {
      try {
        const { categoryCode } = req.query;

        const record = await CategoryModel.findOne({
          where: {
            code: categoryCode,
          },
          include: [
            {
              model: ProductModel,
              include: [QuantityModel],
            },
          ],
        });

        RequestHandler.sendSucceed(res, record);
      } catch (err) {
        console.log(err);
        RequestHandler.sendError(res);
      }
    });
  };
}

export default CategoryController;
