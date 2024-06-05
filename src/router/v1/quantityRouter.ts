import * as express from "express";
import { QuantityController } from "../../controllers";
const router = express.Router();

router.get("/get", QuantityController.Get);

export default router;
