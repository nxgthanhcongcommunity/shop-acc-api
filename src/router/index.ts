import * as express from "express";
const router = express.Router();
import appRouter from "./api";

router.use("/api/v1", appRouter);

export default router;
