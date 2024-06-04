import * as express from "express";
import { InvoiceController } from "../../controllers";
const router = express.Router();

router.post("/create", InvoiceController.Create);

export default router;
