import * as express from "express";
import { ProductController } from "../../controllers";
import { productMulter } from "../../utils/multerUtils";
const router = express.Router();

const cpUpload = productMulter.fields([
  { name: "main-file", maxCount: 1 },
  { name: "child-files", maxCount: 8 },
]);

router.post("/add-product", cpUpload, ProductController.AddProduct);
router.put("/update-product", cpUpload, ProductController.UpdateProduct);
router.delete("/delete-product", cpUpload, ProductController.DeleteProduct);
router.get("/get-products", ProductController.GetProducts);
router.get("/get-products-by-category-code", ProductController.GetProductsByCategoryCode);
router.get("/get-product-by-code", ProductController.GetProductByCode);

//get-product-by-code

export default router;
