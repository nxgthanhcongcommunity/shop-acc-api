import { uploadFileMiddleware } from "../../middlewares";
import { CategoryController } from "../../controllers";
import * as express from "express";
const router = express.Router();

router.post("/upload", uploadFileMiddleware.single("file"), CategoryController.Upload);
router.get("/get-categories", CategoryController.GetCategories);

export default router;
