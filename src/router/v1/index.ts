import * as express from "express";
const appRouter = express.Router();
import masterDataRouter from "./masterDataRouter";
import authRouter from "./authRouter";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLE } from "../../constants";
import bannerRouter from "./bannerRouter";
import categoryRouter from "./categoryRouter";
import productRouter from "./productRouter";
import accountRouter from "./accountRouter";

appRouter.use("/master-data", masterDataRouter); //verifyTokenMiddleware([ROLE.ADMIN])
appRouter.use("/auth", authRouter);
appRouter.use("/banner", bannerRouter);
appRouter.use("/category", categoryRouter);
appRouter.use("/product", productRouter);
appRouter.use("/account", accountRouter);

export default appRouter;
