import { Op } from "sequelize";
import { CategoryModel, ProductModel, QuantityModel } from "../models";
import utils, { RequestHandler } from "../utils";
import BaseController from "./BaseController";
import BaseBusiness from "../business/BaseBusiness";

class CategoryController extends BaseController {
  GetCategories = async (req, res) => {
    await this.ProcessAsync(req, res, async () => {
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
      return BaseBusiness.Success({ total, data });
    });
  };
  AddCategory = async (req, res) => {
    await this.ProcessAsync(req, res, async () => {
      const { name, bannerCode, mainFileCLDId } = req.body;
      const code = `CA-${utils.generateUniqueString(6)}`;
      await CategoryModel.create({
        name,
        bannerCode,
        mainFileCLDId,
        code,
      });
      return BaseBusiness.Success(true);
    });
  };

  UpdateCategory = async (req, res) => {
    await this.ProcessAsync(req, res, async () => {
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
      return BaseBusiness.Success(true);
    });
  };

  DeleteCategory = async (req, res) => {
    await this.ProcessAsync(req, res, async () => {
      const { id } = req.body;

      await CategoryModel.destroy({
        where: {
          id,
        },
      });

      return BaseBusiness.Success(true);
    });
  };

  GetCategoriesByBannerCode = async (req, res) => {
    await this.ProcessAsync(req, res, async () => {
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

      return BaseBusiness.Success(records);
    });
  };

  GetCategoryByCode = async (req, res) => {
    await this.ProcessAsync(req, res, async () => {
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
      return BaseBusiness.Success(record);
    });
  };
}

export default CategoryController;
