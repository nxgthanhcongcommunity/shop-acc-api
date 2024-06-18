import { wsUtils } from "../utils";
import BaseController from "./BaseController";

class TestController extends BaseController {
  TEST = async (req, res) =>
    this.ProcessAsync(res, () => {
      wsUtils.sendToAccount("USR-QDGVLE", "nice");

      res.send("ok");
    });
}

export default TestController;
