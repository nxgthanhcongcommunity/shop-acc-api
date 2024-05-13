import * as express from "express";
const appRouter = express.Router();
import masterDataRouter from "./masterDataRouter";
import authRouter from "./authRouter";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLE } from "../../constants";
import bannerRouter from "./bannerRouter";
import categoryRouter from "./categoryRouter";
import productRouter from "./productRouter";

appRouter.use("/master-data", verifyTokenMiddleware([ROLE.ADMIN]), masterDataRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/banner", bannerRouter);
appRouter.use("/category", categoryRouter);
appRouter.use("/product", productRouter);

export default appRouter;
