import * as express from "express";
import { MasterDataController } from "../../controllers";
const router = express.Router();

router.get("/get-by-key", MasterDataController.GetByKey);

export default router;
