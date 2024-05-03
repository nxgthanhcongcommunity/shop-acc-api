import { MasterDataController } from "../../controllers";
import * as express from "express";
const router = express.Router();

router.get("/get-by-key", MasterDataController.GetByKey);

export default router;
