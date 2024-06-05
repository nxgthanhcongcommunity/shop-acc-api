import * as express from "express";
import { InvoiceDetailsController } from "../../controllers";
const router = express.Router();

router.get("/get", InvoiceDetailsController.Get);

export default router;
