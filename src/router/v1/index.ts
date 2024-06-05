import * as express from "express";
const appRouter = express.Router();
import masterDataRouter from "./masterDataRouter";
import authRouter from "./authRouter";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLE } from "../../constants";
import categoryRouter from "./categoryRouter";
import productRouter from "./productRouter";
import accountRouter from "./accountRouter";
import transactionRouter from "./transactionRouter";
import balanceRouter from "./balanceRouter";
import invoiceRouter from "./invoiceRouter";
import invoiceDetailsRouter from "./invoiceDetailsRouter";
import quantityRouter from "./quantityRouter";
import sendMailRouter from "./sendMailRouter";

appRouter.use("/master-data", masterDataRouter); //verifyTokenMiddleware([ROLE.ADMIN])
appRouter.use("/auth", authRouter);
appRouter.use("/category", categoryRouter);
appRouter.use("/product", productRouter);
appRouter.use("/account", accountRouter);
appRouter.use("/transaction", transactionRouter);
appRouter.use("/balance", balanceRouter);
appRouter.use("/invoice", invoiceRouter);
appRouter.use("/invoice-details", invoiceDetailsRouter);
appRouter.use("/quantity", quantityRouter);
appRouter.use("/sendmail", sendMailRouter);

export default appRouter;
