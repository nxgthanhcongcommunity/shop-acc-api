import * as express from "express";
import { InvoiceController } from "../../controllers";
import { verifyTokenMiddleware } from "../../middlewares";
const router = express.Router();

router.post("/create", verifyTokenMiddleware(["MEMBER"]), InvoiceController.Create);
router.get("/get", InvoiceController.GetAll);
router.get("/get-invoice-by-code", InvoiceController.GetInvoiceByCode);
router.get("/get-invoice-details", InvoiceController.GetInvoiceDetails);

export default router;
