import { CategoryModel, ProductModel, QuantityModel } from "../models";
import utils from "../utils";
import BaseController from "./BaseController";

class CategoryController extends BaseController {
  GetCategories = async (req, res) => {
    try {
      const { page, limit } = req.query;

      const records = await CategoryModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        order: [["updatedAt", "DESC"]],
        include: [ProductModel],
      });

      const total = await CategoryModel.count();
      return res.json({
        succeed: true,
        data: { total, records },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  AddCategory = async (req, res) => {
    try {
      const { name, bannerCode, mainFileCLDId } = req.body;
      const code = `CA-${utils.generateUniqueString(6)}`;
      await CategoryModel.create({
        name,
        bannerCode,
        mainFileCLDId,
        code,
      });
      return res.json({
        succeed: true,
        data: true,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  UpdateCategory = async (req, res) => {
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
      return res.json({
        succeed: true,
        data: true,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  DeleteCategory = async (req, res) => {
    try {
      const { id } = req.body;

      await CategoryModel.destroy({
        where: {
          id,
        },
      });

      return res.json({
        succeed: true,
        data: true,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetCategoriesByBannerCode = async (req, res) => {
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
      return res.json({
        succeed: true,
        data: records,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  GetCategoryByCode = async (req, res) => {
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
      return res.json({
        succeed: true,
        data: record,
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };
}

export default CategoryController;
