import { CategoryModel, ProductModel } from "../models";
import utils, { logUtils } from "../utils";
import BaseBusiness from "./BaseBusiness";

class CategoryBusiness {
  GetAllCategoriesAsync = async (req) => {
    try {
      const { page, limit } = req.query;

      const data = await CategoryModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        order: [["updatedAt", "DESC"]],
        include: [ProductModel],
      });

      const total = await CategoryModel.count();
      return BaseBusiness.Success({ total, data });
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };
  AddCategory = async (req) => {
    try {
      const { name, bannerCode, mainFileCLDId } = req.body;
      const code = `CA-${utils.generateUniqueString(6)}`;
      await CategoryModel.create({
        name,
        bannerCode,
        mainFileCLDId,
        code,
      });
      return BaseBusiness.Success(true);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };
  UpdateCategory = async (req) => {
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
      return BaseBusiness.Success(true);
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };
}

export default CategoryBusiness;
