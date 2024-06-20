import * as express from "express";
import { InvoiceController } from "../../controllers";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLES } from "../../constants";
const router = express.Router();

router.post("/create", verifyTokenMiddleware(ROLES.MEMBER), InvoiceController.Create);
router.get("/get", verifyTokenMiddleware(ROLES.ADMIN), InvoiceController.GetAll);
router.get("/get-invoice-by-code", verifyTokenMiddleware(ROLES.MEMBER), InvoiceController.GetInvoiceByCode);
router.get("/get-invoice-details", verifyTokenMiddleware(ROLES.ADMIN), InvoiceController.GetInvoiceDetails);

export default router;
