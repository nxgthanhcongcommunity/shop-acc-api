import * as express from "express";
const appRouter = express.Router();
import masterDataRouter from "./masterDataRouter";

appRouter.use("/master-data", masterDataRouter);

export default appRouter;
