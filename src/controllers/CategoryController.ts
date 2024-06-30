import { CategoryBusiness } from "../business";
import BaseBusiness from "../business/BaseBusiness";
import { CategoryModel, ProductModel, QuantityModel } from "../models";
import utils from "../utils";
import BaseController from "./BaseController";

class CategoryController extends BaseController {
  _categoryBusiness = new CategoryBusiness();

  GetCategories = async (req, res) =>
    await this.ProcessAsync(req, res, () =>
      this._categoryBusiness.GetAllCategoriesAsync(req)
    );
  AddCategory = async (req, res) => {
    await this.ProcessAsync(req, res, async () =>
      this._categoryBusiness.AddCategory(req)
    );
  };

  UpdateCategory = async (req, res) => {
    await this.ProcessAsync(req, res, async () =>
      this._categoryBusiness.UpdateCategory(req)
    );
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
