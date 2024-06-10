import { RequestHandler } from "../utils";

class BaseController {
    ProcessAsync = async (res, cb) => {
        RequestHandler.send(res, await cb());
    }
}

export default BaseController;