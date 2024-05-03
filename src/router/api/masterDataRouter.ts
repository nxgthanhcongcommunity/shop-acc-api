import * as express from "express";
const router = express.Router();

router.get("/home-page", (req, res) => {
  res.send("ok");
});

export default router;
