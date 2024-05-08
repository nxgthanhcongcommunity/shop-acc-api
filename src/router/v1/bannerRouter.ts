import { uploadFileMiddleware } from "../../middlewares";
import { BannerController } from "../../controllers";
import * as express from "express";
const router = express.Router();

router.post("/upload", uploadFileMiddleware.single("file"), BannerController.Upload);
router.get("/get-banners", BannerController.GetBanners);

export default router;
