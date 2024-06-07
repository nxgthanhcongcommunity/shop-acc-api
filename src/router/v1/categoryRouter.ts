import { uploadFileMiddleware } from "../../middlewares";
import { CategoryController } from "../../controllers";
import * as express from "express";
import { categoryMulter } from "../../utils/multerUtils";
const router = express.Router();

const cpUpload = categoryMulter.fields([{ name: "main-file", maxCount: 1 }]);

router.get("/get-categories", CategoryController.GetCategories);
router.post("/add-category", cpUpload, CategoryController.AddCategory);
router.put("/update-category", CategoryController.UpdateCategory);
router.delete("/delete-category", CategoryController.DeleteCategory);

router.get(
  "/get-categories-by-banner-code",
  CategoryController.GetCategoriesByBannerCode
);

router.get("/get-category-by-code", CategoryController.GetCategoryByCode);

export default router;
