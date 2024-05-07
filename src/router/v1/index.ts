import * as express from "express";
const appRouter = express.Router();
import masterDataRouter from "./masterDataRouter";
import authRouter from "./authRouter";
import { verifyTokenMiddleware } from "../../middlewares";
import { ROLE } from "../../constants";

appRouter.use("/master-data", verifyTokenMiddleware([ROLE.ADMIN]), masterDataRouter);
appRouter.use("/auth", authRouter);

export default appRouter;
