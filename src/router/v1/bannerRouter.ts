import { uploadFileMiddleware } from "../../middlewares";
import { BannerController } from "../../controllers";
import * as express from "express";
const router = express.Router();

router.post(
  "/upload",
  uploadFileMiddleware.single("file"),
  BannerController.Upload
);
router.get("/get-banners", BannerController.GetBanners);
router.get("/get-banner-by-code", BannerController.GetBannerByCode);
//
router.post("/add-banner", BannerController.AddBanner);
router.put("/update-banner", BannerController.UpdateBanner);
router.delete("/delete-banner", BannerController.DeleteBanner);

//DeleteBanner

export default router;
