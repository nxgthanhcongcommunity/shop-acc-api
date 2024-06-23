import { uploadFileMiddleware } from "../../middlewares";
import { CategoryController } from "../../controllers";
import * as express from "express";
import { categoryMulter } from "../../utils/multerUtils";
import { CategoryValidator } from "../../validators";
const router = express.Router();

// const cpUpload = categoryMulter.fields([{ name: "main-file", maxCount: 1 }]);
const categoryValidator = new CategoryValidator();
const categoryController = new CategoryController();

router.get("/get-categories", categoryController.GetCategories);
router.post(
  "/add-category",
  categoryValidator.AddCategoryAsync,
  categoryController.AddCategory
);
router.put(
  "/update-category",
  categoryValidator.UpdateCategoryAsync,
  categoryController.UpdateCategory
);
router.delete(
  "/delete-category",
  categoryValidator.DeleteCategoryAsync,
  categoryController.DeleteCategory
);

router.get(
  "/get-categories-by-banner-code",
  categoryValidator.GetCategoriesByBannerCodeAsync,
  categoryController.GetCategoriesByBannerCode
);

router.get(
  "/get-category-by-code",
  categoryValidator.GetCategoryByCodeAsync,
  categoryController.GetCategoryByCode
);

export default router;
