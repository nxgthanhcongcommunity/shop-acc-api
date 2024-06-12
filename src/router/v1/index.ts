import * as express from "express";
import accountRouter from "./accountRouter";
import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";
import invoiceRouter from "./invoiceRouter";
import masterDataRouter from "./masterDataRouter";
import productRouter from "./productRouter";
import sendMailRouter from "./sendMailRouter";
import transactionRouter from "./transactionRouter";
import vnpayTransactionRouter from "./vnpayTransactionRouter";
import testRouter from "./testRouter";
const appRouter = express.Router();

appRouter.use("/master-data", masterDataRouter); //verifyTokenMiddleware([ROLE.ADMIN])
appRouter.use("/auth", authRouter);
appRouter.use("/category", categoryRouter);
appRouter.use("/product", productRouter);
appRouter.use("/account", accountRouter);
appRouter.use("/transaction", transactionRouter);
appRouter.use("/vnpay-transaction", vnpayTransactionRouter);
appRouter.use("/invoice", invoiceRouter);
appRouter.use("/sendmail", sendMailRouter);
appRouter.use("/test", testRouter);

export default appRouter;
