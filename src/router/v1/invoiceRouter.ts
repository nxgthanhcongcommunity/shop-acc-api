import * as express from "express";
import { InvoiceController } from "../../controllers";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLES } from "../../constants";
import { InvoiceValidator } from "../../validators";
const router = express.Router();

const invoiceValidator = new InvoiceValidator();
const invoiceController = new InvoiceController();

router.post(
  "/create",
  verifyTokenMiddleware([ROLES.MEMBER]),
  invoiceValidator.CreateAsync,
  invoiceController.Create
);
router.get(
  "/get",
  verifyTokenMiddleware([ROLES.ADMIN]),
  invoiceController.GetAll
);
router.get(
  "/get-invoice-by-code",
  verifyTokenMiddleware([ROLES.MEMBER]),
  invoiceValidator.GetInvoiceByCodeAsync,
  invoiceController.GetInvoiceByCode
);
router.get(
  "/get-invoice-details",
  verifyTokenMiddleware([ROLES.ADMIN]),
  invoiceController.GetInvoiceDetails
);
router.get(
  "/get-purchase-history",
  invoiceValidator.GetPurchaseHistoryAsync,
  invoiceController.GetPurchaseHistoryAsync
);

export default router;
