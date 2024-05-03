import * as express from "express";
const router = express.Router();
import masterDataRouter from "./masterDataRouter";

router.use("/master-data", masterDataRouter);

export default router;
