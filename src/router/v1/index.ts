import * as express from "express";
const appRouter = express.Router();
import masterDataRouter from "./masterDataRouter";
import authRouter from "./authRouter";

appRouter.use("/master-data", masterDataRouter);
appRouter.use("/auth", authRouter);

export default appRouter;
