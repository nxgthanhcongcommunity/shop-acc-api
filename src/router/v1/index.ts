import * as express from "express";
const appRouter = express.Router();
import masterDataRouter from "./masterDataRouter";
import authRouter from "./authRouter";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLE } from "../../constants";
import bannerRouter from "./bannerRouter";
import categoryRouter from "./categoryRouter";

appRouter.use("/master-data", verifyTokenMiddleware([ROLE.ADMIN]), masterDataRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/banner", bannerRouter);
appRouter.use("/category", categoryRouter);

export default appRouter;
