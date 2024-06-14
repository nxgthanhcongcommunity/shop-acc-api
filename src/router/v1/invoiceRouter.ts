import * as express from "express";
import { InvoiceController } from "../../controllers";
const router = express.Router();

router.post("/create", InvoiceController.Create);
router.get("/get", InvoiceController.GetAll);
router.get("/get-invoice-by-code", InvoiceController.GetInvoiceByCode);
router.get("/get-invoice-details", InvoiceController.GetInvoiceDetails);

export default router;
