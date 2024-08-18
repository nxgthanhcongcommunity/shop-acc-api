import { validationResult } from "express-validator";
import { RequestHandler } from "../utils";

class BaseController {
  ProcessAsync = async (req, res, cb) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return RequestHandler.send(
        //   res,
        //   BaseBusiness.Success({ errors: errors.array() })
        // );
      }

      const result = await cb();
      return RequestHandler.send(res, result);
    } catch (err) {
      console.log(err);
      return RequestHandler.sendError(res, "server error");
    }
  };
}

export default BaseController;
