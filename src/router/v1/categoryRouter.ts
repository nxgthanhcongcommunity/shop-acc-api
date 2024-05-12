import { uploadFileMiddleware } from "../../middlewares";
import { CategoryController } from "../../controllers";
import * as express from "express";
const router = express.Router();

router.post(
  "/upload",
  uploadFileMiddleware.single("file"),
  CategoryController.Upload
);
router.get("/get-categories", CategoryController.GetCategories);
router.post("/add-category", CategoryController.AddCategory);
router.put("/update-category", CategoryController.UpdateCategory);
router.delete("/delete-category", CategoryController.DeleteCategory);

export default router;
