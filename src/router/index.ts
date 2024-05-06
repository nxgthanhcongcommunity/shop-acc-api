import * as express from "express";
const router = express.Router();
import appRouterV1 from "./v1";

router.use("/api/v1", appRouterV1);

export default router;
