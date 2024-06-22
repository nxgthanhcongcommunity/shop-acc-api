import { validationResult } from "express-validator";
import { RequestHandler } from "../utils";
import BaseBusiness from "../business/BaseBusiness";

class BaseController {
  ProcessAsync = async (req, res, cb) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      RequestHandler.send(
        res,
        BaseBusiness.Success({ errors: errors.array() })
      );
      return;
    }

    RequestHandler.send(res, await cb());
  };
}

export default BaseController;
