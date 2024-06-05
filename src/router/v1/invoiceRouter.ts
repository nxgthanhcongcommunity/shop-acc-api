import * as express from "express";
import { InvoiceController } from "../../controllers";
const router = express.Router();

router.post("/create", InvoiceController.Create);
router.get("/get", InvoiceController.Get);

export default router;
